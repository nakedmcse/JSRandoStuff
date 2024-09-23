// Simple device id hasher
import express from 'express'
import crypto from 'crypto'
const deviceApi = express();
const deviceList = [];

// Hashing function
function deviceHash(req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ua = req.headers['user-agent'];
    return crypto.createHash('sha256').update(ip+ua).digest('hex');
}

// Test endpoint
deviceApi.get('/', (req, res) => {
    const devHash = deviceHash(req);
    if(!deviceList.find(x => x === devHash)) {
        console.log(`UNKNOWN DEVICE ${devHash}`)
        deviceList.push(devHash);
        console.log('DEVICE ADDED');
    } else {
        console.log('KNOWN DEVICE');
    }
    res.send(JSON.stringify({"msg": "OK"}));
})

deviceApi.listen(3000, () => {
    console.log('HASHTEST Listening on port 3000');
});
