const ws = require('ws');

const PORT = 8999;

const wss = new ws.WebSocketServer({ port: PORT }, () => {
  console.log(`Websocket started http://localhost:${PORT}`);
});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', JSON.parse(data));
    ws.send(
      JSON.stringify({
        type: 'MESSAGE',
        result: { message: 'Message received' },
        success: true,
      }),
    );
  });
});

const sendMessage = (message, type) => {
  console.log('Sending ', { ...message, type });
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ ...message, type }));
  });
};

module.exports = { sendMessage };
