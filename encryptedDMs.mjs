// Simple E2E encrypted DMs
import crypto from 'crypto'

// Data Classes
class Message {
    constructor(from, to, message) {
        this.from = from;
        this.to = to;
        this.message = message;
    }
}

// Server Side Classes
class ServerUser {
    constructor(username, passwordHash, salt, publicKey, messages = []) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.publicKey = publicKey;
        this.messages = messages;
    }

    encryptPrivateKey(privateKey, password) {
        const key = crypto.createHash('sha256')
            .update(`${this.salt}:${password}`).digest();

        const encrypt = (buffer) => {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
            return Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
        };

        const privateKeyPem = privateKey.export({
            type: 'pkcs8',
            format: 'pem',
        });

        this.encryptedPrivateKey = encrypt(Buffer.from(privateKeyPem));
    }

    printDMs() {
        console.log(`${this.username} server messages:`);
        for(const msg of this.messages) console.log(`${msg.from} -> ${msg.to} : ${msg.message.toString().slice(0,30)}`);
    }
}

// Client Side Classes
class ClientUser {
    constructor() {}

    login(serverUser, password) {
        this.username = serverUser.username;
        this.password = password;
        this.salt = serverUser.salt;
        this.publicKey = serverUser.publicKey;
        this.messages = []

        const key = crypto.createHash('sha256')
            .update(`${this.salt}:${this.password}`).digest();

        const decrypt = (encrypted) => {
            const iv = encrypted.slice(0, 16);
            encrypted = encrypted.slice(16);
            const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
            return Buffer.concat([decipher.update(encrypted), decipher.final()]);
        };

        const privateKeyPem = decrypt(serverUser.encryptedPrivateKey).toString('utf8');

        this.privateKey = crypto.createPrivateKey({
            key: privateKeyPem,
            format: 'pem',
            type: 'pkcs8',
        });
    }

    sendDM(serverUsers, to, message) {
        const serverUserTo = serverUsers.filter(x => x.username === to)[0];
        const recipientMsg = new Message(this.username, serverUserTo.username,
            crypto.publicEncrypt({
                key: serverUserTo.publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256'},
                Buffer.from(message))
        );
        serverUserTo.messages.push(recipientMsg);

        const serverUserFrom = serverUsers.filter(x => x.username === this.username)[0];
        const senderMsg = new Message(this.username, serverUserTo.username,
            crypto.publicEncrypt({
                    key: this.publicKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256'},
                Buffer.from(message))
        );
        serverUserFrom.messages.push(senderMsg);
    }

    getDMs(serverUsers) {
        const thisServerUser = serverUsers.filter(x => x.username === this.username)[0];
        this.messages = [];
        for (const msg of thisServerUser.messages) {
            const decryptedMessage = crypto.privateDecrypt(
                {
                    key: this.privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                msg.message
            ).toString();
            this.messages.push(new Message(msg.from, msg.to, decryptedMessage));
        }
    }

    printDMs() {
        console.log(`${this.username} local messages:`);
        for(const msg of this.messages) console.log(`${msg.from} -> ${msg.to} : ${msg.message}`);
    }
}

// Create two server users - Alice and Bob
const ServerSideUserTable = [];
const { publicKey:alicePublicKey, privateKey:alicePrivateKey } =
    crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // Secure standard length
    });
const ServerAlice = new ServerUser("alice", "", "12345",
    alicePublicKey);
ServerAlice.encryptPrivateKey(alicePrivateKey, "alicePassword");
ServerSideUserTable.push(ServerAlice);

const { publicKey:bobPublicKey, privateKey:bobPrivateKey } =
    crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // Secure standard length
    });
const ServerBob = new ServerUser("bob", "", "67890",
    bobPublicKey);
ServerBob.encryptPrivateKey(bobPrivateKey, "bobPassword");
ServerSideUserTable.push(ServerBob);

// Login two local users
const localAlice = new ClientUser();
localAlice.login(ServerSideUserTable[0],"alicePassword");
const localBob = new ClientUser();
localBob.login(ServerSideUserTable[1],"bobPassword");

// Alice sends Bob a DM
localAlice.sendDM(ServerSideUserTable,"bob", "Hello Bob");

// Bob responds to Alices DM
localBob.sendDM(ServerSideUserTable,"alice", "Hello Alice");

// Print Alices Server and Client DMs
localAlice.getDMs(ServerSideUserTable);
localAlice.printDMs();
ServerSideUserTable[0].printDMs();
console.log();

// Print Bobs Server and Client DMs
localBob.getDMs(ServerSideUserTable);
localBob.printDMs();
ServerSideUserTable[1].printDMs();