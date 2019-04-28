var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://tardis');

client.on('connect', function () {
    client.subscribe('/sportshub/livedata')
    console.log('Socket connected')
})

client.on('message', function (topic, message) {
    io.emit('Plopp');
    //console.log('Livedata: ' + message.toString());
});

server.listen(9090, function () {
    console.log('Example app listening on port 9090!');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  console.log('socket connection')
});