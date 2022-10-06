const express = require('express');
const {
    Server
} = require('socket.io');
const {
    SerialPort,
    ReadlineParser
} = require('serialport');
const app = express();
const httpServer = app.listen(5050);
const ioServer = new Server(httpServer);

const staticDisplay = express.static('public-display');
app.use('/display', staticDisplay);
app.use(express.json());

let characterMessage = {
    x: 0,
    y: 0
};

app.get('/test', (req, res) => {
    console.log(req.body);
    res.send({
        m: 'Okay'
    });
});

ioServer.on('connection', (socket) => {
    socket.broadcast.emit('positions', characterMessage);
});

//------------------------------------------------this opens a port

const protocolConfiguration = {
    path: '/COM5',
    baudRate: 9600
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());


parser.on('data', (data) => {

    // Create the array
    let dataArray = data.split(' ');

    // Parse the Strings to Integer
    characterMessage.x = parseInt(dataArray[1]);
    characterMessage.y = parseInt(dataArray[2]);
    console.log(characterMessage);

    // Emit the message using WebSocket to the client
    ioServer.emit('positions', characterMessage);

});

