const express = require('express');
const { sendMessage } = require('./websocket');

const PORT = 3000;

const createExpressServer = () => {
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

  app.get('/status', (req, res) => {
    res.status(200).type('application/json');
    res.send({ result: { message: 'Server works' }, success: true });
  });

  app.post('/api/init', (req, res) => {
    res.status(200).type('application/json');
    sendMessage({ result: {} }, 'RESET');
    res.send({ result: {}, success: true });
  });

  app.post('/api/reset', (req, res) => {
    res.status(200).type('application/json');
    sendMessage({ result: {} }, 'RESET');
    res.send({ result: {}, success: true });
  });

  app.post('/api/metric', (req, res) => {
    res.status(200).type('application/json');

    const metric = { name: req.body.name, value: req.body.value };

    sendMessage({ result: { ...metric } }, 'METRIC');

    res.send({ result: {}, success: true });
  });

  // app.get('/api/metric', (req, res) => {
  //   res.status(200).type('application/json');
  //
  //   metrics.get(req.body.name);
  // });
  //
  // app.listen(PORT, () => {
  //   console.log(`Server started http://localhost:${PORT}`);
  // });

  app.listen(PORT, () => {
    console.log(`Server started http://localhost:${PORT}`);
  });
};

module.exports = createExpressServer;
