import express from 'express'
import maxmind from 'maxmind'

const echoApp = express();
echoApp.use(express.json());

const detectUK = async function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const lookup = await maxmind.open('Geolite2-Country.mmdb');
    const iplookup = lookup.get(ip);
    if(iplookup.country.iso_code === 'GB') {
        // GB IP detected - do something
        console.log("UK IP DETECTED");
    }
    next();
}
echoApp.use(detectUK);

echoApp.get('/', (req, res) => {
    console.log(req.query);
    console.log(req.headers);
    console.log();
    res.send(JSON.stringify({ok:"OK"}));
});

echoApp.post('/', (req, res) => {
    console.log(req.query);
    console.log(req.headers);
    console.log(req.body);
    console.log();
    res.send(JSON.stringify({ok:"OK"}));
});

echoApp.listen(3000, () => {
    console.log('Echo listening on port 3000');
});