/*const path = require('path'); // algunos modulos de node.js
//console.log(`el resultado es ${a+b}`);
console.log(`la ruta actual ${__dirname}`);
console.log(`la ruta de tu archivo ${__filename}`);
console.log(path.basename(__filename)); // extrae solo el nombre del archivo
let nombre;
process.stdout.write("Dime tu nombre: \n");

process.stdin.on('data', (data) => {
    nombre = data.toString();
    process.stdout.write(`Tu nombre es ${nombre}`);
    process.exit();
})*/

// Include process module
const process = require('process');

// Printing process.argv property value
console.log(process.argv);