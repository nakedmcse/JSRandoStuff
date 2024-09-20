import express from 'express'
const echoApp = express();
echoApp.use(express.json());

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