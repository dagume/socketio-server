const Redis = require('ioredis');
const REDIS_URL = 'redis://localhost:6379'; // Reemplaza con la URL de tu servidor Redis

io = require('socket.io-client');
const socket = io("http://localhost:3000")
const Gpio = require('onoff').Gpio;

// Elige el número del pin GPIO que deseas utilizar
const pinNumber = 17;
let count2 = 0;
// Crea una instancia del objeto GPIO para el pin seleccionado
const gpioInput = new Gpio(pinNumber, 'in');

// Función para simular una señal de entrada
function simulateInput() {
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
    redis.quit();

    // Llama a esta función nuevamente después de 10 ms (100 señales por segundo)
    setTimeout(simulateInput, 10);
}

// Inicia la simulación
simulateInput();

// Detiene la simulación después de 5 segundos
// setTimeout(() => {
//     gpioInput.unexport();
//     process.exit();
// }, 60000);

// Manejo de cierre del programa (Ctrl+C)
process.on('SIGINT', () => {
    gpioInput.unexport();
    process.exit();
});
