const Redis = require('ioredis');
const REDIS_URL = 'redis://localhost:6379'; // Reemplaza con la URL de tu servidor Redis

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
  // Crea una instancia de la conexión a Redis
  const redis = new Redis(REDIS_URL);
  redis.lrange('history-test4', -1, -1)
    .then(result => {
      const ultimoValor = result[0] || new Date().getTime();
      socket.emit('unitCount', {
        count:count2++ + 1,
        lastStop: ultimoValor
      })
    })
    .catch(error => {
      console.error('Error al obtener el último valor:', error);
    });
});


// process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
