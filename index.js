const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
//static files
// app.use(express.static(__dirname + '/public'));
//start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
    require('./public/gpio.js');
});

//Socket.io
const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
        origin: "http://localhost:8000"
    }
});
io.on('connection', (socket) => {
    console.log('new connection',socket.id);
    socket.on('onOff', (data) => {
        io.sockets.emit('onOff', data);
    });
    socket.on('unitCount', (data) => {
        io.sockets.emit('unitCount', data);
    });
});




// const runtimeString = `${runtimeDays > 0 ? runtimeDays + "d " : ""}${(parseInt(runtimeHours) + runtimeDays * 24).toString().padStart(2, "0")}:${runtimeMinutes}:${runtimeSeconds}`;
