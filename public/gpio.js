io = require('socket.io-client');
const socket = io("http://localhost:3000")
let count = 0;
let count2 = 0;

function unexportOnClose() { //function to run when exiting program
    Butto1.unexport(); // Unexport Button GPIO to free resources
    Butto2.unexport(); // Unexport Button GPIO to free resources
};

const Gpio = require('onoff').Gpio;
const Butto1 = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 });
const Butto2 = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 });

Butto1.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) { //if an error
        console.error('There was an error', err); //output error message to console
        return;
    }
    socket.emit('onOff', count++ + 1)
    console.log(count)
});
Butto2.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) { //if an error
        console.error('There was an error', err); //output error message to console
        return;
    }
    socket.emit('unitCount', count2++ + 1)
    console.log(count2)
});


// process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
