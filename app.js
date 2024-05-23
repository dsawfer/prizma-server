const createExpressServer = require('./express');
const createWebsocket = require('./websocket');
const Metrics = require('./metrics');

const metrics = new Metrics();

createExpressServer(metrics);
createWebsocket(metrics);
