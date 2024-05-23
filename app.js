const express = require('express')
const app = express()
const host = '127.0.0.1'
const port = 3000

let metrics = {};

app.use(express.static('public'))

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.get('/init', (req, res) => {
    res.status(200).type('application/json');
    metrics = {};
    res.send({result: {}, success: true});
});

app.get('/status', (req, res) => {
    res.status(200).type('application/json');
    res.send({result: {message: 'Server works'}, success: true});
});

app.post('/api/metric', (req, res) => {
    res.status(200).type('application/json');
    console.log(req.body);
    if (!(req.body.name in metrics)) {
        metrics[req.body.name] = req.body.value;
        console.log(`New metric added - ${req.body.name}: ${req.body.value}`)

        res.send({result: {}, success: true});
    } else {
        res.send({result: {message: 'metric already exists'}, success: false});
    }
});

app.get('/api/metric', (req, res) => {
    res.status(200).type('application/json');
    if (req.body.name in metrics) {
        res.send({result: {value: metrics[req.body.name]}, success: true});
    } else {
        res.send({result: {message: 'no such metric in storage'}, success: true});
    }
});

app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
})