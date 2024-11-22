// Simple URL Forwarder
import express from 'express'

const urlForwardAPI = express();
urlForwardAPI.use(express.json());

class errorMsg {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

class urlForward {
    constructor(slug, target, expires) {
        this.slug = slug;
        this.target = target;
        this.expires = expires;
    }
}

const forwards = [];

// Add a forward
urlForwardAPI.post('/add', async (req, res) => {
    if(!req.query.target || !req.query.slug || !req.query.expires) {
        res.status(400).send(JSON.stringify(new errorMsg(400, "Missing Slug, Target or Expires")));
        return;
    }
    const exists = forwards.findIndex(x => x.slug === req.query.slug);
    if(exists !== -1) forwards.splice(exists,1);
    forwards.push(new urlForward(req.query.slug, req.query.target, Date.now()+(1000 * parseInt(req.query.expires))));
    res.send(JSON.stringify(new errorMsg(200, "Forward set")));
})

// Handle a forward
urlForwardAPI.get('/:slug', async (req, res) => {
    const path = req.params.slug;
    const target = forwards.find(x => x.slug === path);
    if (!target) {
        res.status(404).send(JSON.stringify(new errorMsg(404, "Slug not found")));
        return;
    }
    if (target.expires <= Date.now()) {
        const idx = forwards.findIndex(x => x.slug === path);
        forwards.splice(idx, 1); // Remove expired forward
        res.status(404).send(JSON.stringify(new errorMsg(404, "Slug expired")));
        return;
    }
    res.redirect(target.target);
})

// Start
urlForwardAPI.listen(3000, () => {
    console.log('URL Forwarder listening on port 3000');
});