const express = require('express');

const PORT = 3000;

const createExpressServer = (metrics) => {
  const app = express();

  app.use(express.static('public'));

  app.use(express.json());

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type',
    );
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });

  app.get('/', (req, res) => {
    res.send('Welcome');
  });

  app.post('/init', (req, res) => {
    res.status(200).type('application/json');
    metrics.reset();
    res.send({ result: {}, success: true });
  });

  app.get('/status', (req, res) => {
    res.status(200).type('application/json');
    res.send({ result: { message: 'Server works' }, success: true });
  });

  app.post('/api/metric', (req, res) => {
    res.status(200).type('application/json');

    metrics.push({ name: req.body.name, value: req.body.value });

    // if (!(req.body.name in metrics)) {
    //   metrics[req.body.name] = req.body.value;
    //
    //   res.send({ result: {}, success: true });
    // } else {
    //   res.send({
    //     result: { message: 'metric already exists' },
    //     success: false,
    //   });
    // }
  });

  app.get('/api/metric', (req, res) => {
    res.status(200).type('application/json');

    metrics.get(req.body.name);

    // if (req.body.name in metrics) {
    //   res.send({ result: { value: metrics[req.body.name] }, success: true });
    // } else {
    //   res.send({
    //     result: { message: 'no such metric in storage' },
    //     success: true,
    //   });
    // }
  });

  app.listen(PORT, () => {
    console.log(`Server started http://localhost:${PORT}`);
  });
};

module.exports = createExpressServer;
