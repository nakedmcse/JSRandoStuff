// Simple blackjack games as an API
import express from 'express'
import crypto from 'crypto'
const blackjackAPI = express();
blackjackAPI.use(express.json());

// Classes
class game {
    constructor(token, ip, status, deck = [], dealerCards = [], playerCards = []) {
        this.token = token;
        this.ip = ip;
        this.status = status;
        this.deck = deck;
        this.dealerCards = dealerCards;
        this.playerCards = playerCards;
    }

    createDeck() {
        for(const suit of suits) {
            for(const face of faces) {
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
const suits = ['\u2660','\u2663','\u2665','\u2666'];
const faces = ['2','3','4','5','6','7','8','9','10','A','J','Q','K'];
const currentGames = [];

// Utils
function checkToken(req, res) {
    if(!req.query.token) {
        res.status = 400;
        res.send(JSON.stringify(new errorMsg(400, "Missing Token")));
        return null;
    }
    const retGame = currentGames.find(x => x.token === req.query.token);
    if(!retGame) {
        res.status = 400;
        res.send(JSON.stringify(new errorMsg(400, "Missing Game")));
        return null;
    }
    return retGame;
}

// Endpoints
blackjackAPI.get('/deal', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    let retGame = currentGames.find(x => x.ip === ip);
    if (!retGame) {
        retGame = new game(crypto.randomUUID(), ip, "playing")
        retGame.createDeck();
        retGame.deal();
        currentGames.push(retGame);
        console.log(`Created new game for ${ip}:${retGame.token}`);
    }
    console.log(`DEAL: ${retGame.token}`);
    const resp = new responseMsg(retGame.token, retGame.playerCards, [],
        retGame.value(retGame.playerCards), 0, retGame.status);
    res.send(JSON.stringify(resp));
});

blackjackAPI.get('/hit', (req, res) => {
    const retGame = checkToken(req, res);
    if(!retGame) {
        return;
    }
    retGame.hit();
    console.log(`HIT: ${retGame.token}`);
    if(retGame.value(retGame.playerCards) > 21) {
        retGame.status = "Bust";
        console.log("BUST");
    }
    const resp = new responseMsg(retGame.token, retGame.playerCards, [],
        retGame.value(retGame.playerCards), 0, retGame.status);
    if(retGame.status === "Bust") {
        currentGames.splice(currentGames.findIndex(x => x.token === retGame.token),1);
    }
    res.send(JSON.stringify(resp));
});

blackjackAPI.get('/stay', (req, res) => {
    const retGame = checkToken(req, res);
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
    }
    else if(playerVal > dealerVal) {
        retGame.status = "Player Wins";
        console.log("PLAYER WIN");
    }
    else if(dealerVal > playerVal) {
        retGame.status = "Dealer Wins";
        console.log("DEALER WIN");
    }
    else {
        retGame.status = "Draw";
        console.log("DRAW");
    }
    const resp = new responseMsg(retGame.token, retGame.playerCards, retGame.dealerCards,
        retGame.value(retGame.playerCards), dealerVal, retGame.status);
    currentGames.splice(currentGames.findIndex(x => x.token === retGame.token),1);
    res.send(JSON.stringify(resp));
});

// Start
blackjackAPI.listen(3000, () => {
    console.log('BlackJack listening on port 3000');
});