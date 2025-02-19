const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8181 });
wss.on('connection',function connection(client) {
    client.on('message',function incoming(message) {
        console.log('received: %s', message);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${message}`);
            }
        });
    });
});
exports.module = wss;