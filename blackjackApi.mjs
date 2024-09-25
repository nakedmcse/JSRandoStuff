// Simple blackjack games as an API
import express from 'express'
import crypto from 'crypto'
import {DataSource, EntitySchema} from "typeorm";
const blackjackAPI = express();
blackjackAPI.use(express.json());

// Classes
class game {
    constructor(token, ip, status, startedOn, deck = [], dealerCards = [], playerCards = []) {
        this.token = token;
        this.ip = ip;
        this.status = status;
        this.startedOn = startedOn;
        this.deck = deck;
        this.dealerCards = dealerCards;
        this.playerCards = playerCards;
    }

    static suits = ['\u2660','\u2663','\u2665','\u2666'];
    static faces = ['2','3','4','5','6','7','8','9','10','A','J','Q','K'];

    createDeck() {
        for(const suit of game.suits) {
            for(const face of game.faces) {
                this.deck.push(face + suit);
            }
        }
        for(let i = 0; i < this.deck.length; i++) {
            const j = Math.floor(Math.random() * this.deck.length);
            const origCard = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = origCard;
        }
    }

    deal() {
        this.playerCards.push(this.deck.pop());
        this.playerCards.push(this.deck.pop());
        this.dealerCards.push(this.deck.pop());
        this.dealerCards.push(this.deck.pop());
    }

    hit() {
        this.playerCards.push(this.deck.pop());
    }

    stay() {
        while(this.value(this.dealerCards) < 17) {
            this.dealerCards.push(this.deck.pop())
        }
    }

    value(cards) {
        let retval = 0;
        let hasAce = false
        for(const card of cards) {
            const intVal = parseInt(card,10);
            if(!isNaN(intVal)) {
                retval += intVal
                continue;
            }
            if(card.includes("J") || card.includes("Q") || card.includes("K")) {
                retval += 10;
                continue;
            }
            if(card.includes("A")) {
                hasAce = true;
            }
        }
        if(hasAce) {
            for(const card of cards.filter(x => x.includes("A"))) {
                retval += (retval + 11 > 21) ? 1 : 11;
            }
        }
        return retval;
    }
}

class stat {
    constructor(device, wins, loses, draws) {
        this.device = device;
        this.wins = wins;
        this.loses = loses;
        this.draws = draws;
    }
}

class responseMsg {
    constructor(token, cards, dealerCards, handValue, dealerValue, status) {
        this.token = token;
        this.cards = cards;
        this.dealerCards = dealerCards;
        this.handValue = handValue;
        this.dealerValue = dealerValue;
        this.status = status;
    }
}

class errorMsg {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

// Globals
const gameSchema = new EntitySchema({
    name: "game",
    tableName: "games",
    columns: {
        token: { primary: true, type: "text", unique: true, nullable: false },
        ip: { type: "text" },
        status: { type: "text" },
        startedOn: { type: "integer"},
        deck: { type: "simple-array" },
        playerCards: { type: "simple-array" },
        dealerCards: { type: "simple-array" }
    }
})
const statSchema = new EntitySchema({
    name: "stat",
    tableName: "stats",
    columns: {
        device: { primary: true, type: "text", unique: true, nullable: false },
        wins: { type: "integer" },
        loses: { type: "integer" },
        draws: { type: "integer" }
    }
})
const dataSource = new DataSource({
    type: "better-sqlite3",
    synchronize: true,
    database: "main.sqlite",
    entities: [gameSchema, statSchema]
});

// Utils
async function checkToken(req, res) {
    if(!req.query.token) {
        res.status = 400;
        res.send(JSON.stringify(new errorMsg(400, "Missing Token")));
        return null;
    }
    const gameRepo = dataSource.getRepository("game");
    const retGame = await gameRepo.findOneBy({ token: req.query.token });
    if(!retGame) {
        res.status = 400;
        res.send(JSON.stringify(new errorMsg(400, "Missing Game")));
        return null;
    }

    return Object.setPrototypeOf(retGame, game.prototype);
}

function deviceHash(req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ua = req.headers['user-agent'];
    return crypto.createHash('sha256').update(ip+ua).digest('hex');
}

async function updateStats(req, action) {
    const deviceId = deviceHash(req);
    const statRepo = dataSource.getRepository("stat");
    let userStats = await statRepo.findOneBy({device: deviceId});
    if (!userStats) {
        userStats = new stat(deviceId,0,0,0);
    }
    switch(action) {
        case "win":
            userStats.wins++;
            break;
        case "loss":
            userStats.loses++;
            break;
        case "draw":
            userStats.draws++;
            break;
    }
    await statRepo.save(userStats);
}

// Endpoints
blackjackAPI.get('/deal', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const gameRepo = dataSource.getRepository("game");
    let retGame = await gameRepo.findOneBy({ ip: ip });

    if (!retGame) {
        retGame = new game(crypto.randomUUID(), ip, "playing", Date.now());
        retGame.createDeck();
        retGame.deal();
        await gameRepo.save(retGame);
        console.log(`Created new game for ${ip}:${retGame.token}`);
    } else {
        Object.setPrototypeOf(retGame, game.prototype);
    }
    console.log(`DEAL: ${retGame.token}`);
    const resp = new responseMsg(retGame.token, retGame.playerCards, [],
        retGame.value(retGame.playerCards), 0, retGame.status);
    res.send(JSON.stringify(resp));
});

blackjackAPI.get('/hit', async (req, res) => {
    const retGame = await checkToken(req, res);
    if(!retGame) {
        return;
    }
    retGame.hit();
    console.log(`HIT: ${retGame.token}`);
    if(retGame.value(retGame.playerCards) > 21) {
        retGame.status = "Bust";
        console.log("BUST");
    }

    const gameRepo = dataSource.getRepository("game");
    const resp = new responseMsg(retGame.token, retGame.playerCards, [],
        retGame.value(retGame.playerCards), 0, retGame.status);
    if(retGame.status === "Bust") {
        await gameRepo.remove(retGame);
        await updateStats(req, "loss");
    } else {
        await gameRepo.save(retGame);
    }
    res.send(JSON.stringify(resp));
});

blackjackAPI.get('/stay', async (req, res) => {
    const retGame = await checkToken(req, res);
    if(!retGame) {
        return;
    }
    retGame.stay();
    console.log(`STAY: ${retGame.token}`);
    const playerVal = retGame.value(retGame.playerCards);
    const dealerVal = retGame.value(retGame.dealerCards);
    if(dealerVal > 21) {
        retGame.status = "Dealer Bust";
        console.log("DEALER BUST");
        await updateStats(req, "win");
    }
    else if(playerVal > dealerVal) {
        retGame.status = "Player Wins";
        console.log("PLAYER WIN");
        await updateStats(req, "win");
    }
    else if(dealerVal > playerVal) {
        retGame.status = "Dealer Wins";
        console.log("DEALER WIN");
        await updateStats(req, "loss");
    }
    else {
        retGame.status = "Draw";
        console.log("DRAW");
        await updateStats(req, "draw");
    }

    const gameRepo = dataSource.getRepository("game");
    await gameRepo.remove(retGame);

    const resp = new responseMsg(retGame.token, retGame.playerCards, retGame.dealerCards,
        retGame.value(retGame.playerCards), dealerVal, retGame.status);
    res.send(JSON.stringify(resp));
});

blackjackAPI.get('/stats', async (req, res) => {
    const deviceId = deviceHash(req);
    const statRepo = dataSource.getRepository("stat");
    let userStats = await statRepo.findOneBy({device: deviceId});
    console.log('STATS');
    if (!userStats) {
        console.log('MISSING DEVICE');
        res.status = 400;
        res.send(JSON.stringify(new errorMsg(400, "Missing Device")));
        return;
    }
    delete userStats.device;
    res.send(JSON.stringify(userStats));
});

// Start
blackjackAPI.listen(3000, () => {
    dataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized");
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    console.log('BlackJack listening on port 3000');
});