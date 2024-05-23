const ws = require('ws');

const PORT = 8999;

const createWebsocket = (metrics) => {
  const wss = new ws.WebSocketServer({ port: PORT }, () => {
    console.log(`Websocket started http://localhost:${PORT}`);
  });

  wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
      console.log('received: %s', JSON.parse(data));
      ws.send('success');
    });
  });
};

module.exports = createWebsocket;
