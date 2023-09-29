io = require('socket.io-client');
const socket = io("http://localhost:3000")
const Gpio = require('onoff').Gpio;

// Elige el número del pin GPIO que deseas utilizar
const pinNumber = 0;
let count2 = 0;
// Crea una instancia del objeto GPIO para el pin seleccionado
const gpioInput = new Gpio(pinNumber, 'in');

// Función para simular una señal de entrada
function simulateInput() {
    // Simula una señal de entrada alta (1)
    // const value = gpioInput.readSync();

    socket.emit('unitCount', count2++ + 1)
    // console.log(count2)

    // Llama a esta función nuevamente después de 10 ms (100 señales por segundo)
    setTimeout(simulateInput, 1);
}

// Inicia la simulación
simulateInput();

// Detiene la simulación después de 5 segundos
setTimeout(() => {
    gpioInput.unexport();
    process.exit();
}, 60000);

// Manejo de cierre del programa (Ctrl+C)
process.on('SIGINT', () => {
    gpioInput.unexport();
    process.exit();
});
