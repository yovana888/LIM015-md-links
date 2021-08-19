#! /usr/bin/env node

const { argvL1, argvL2, argvL3, errorOptions } = require('./cliFunctions.js');
const [, , ...argv] = process.argv;
const argvLenght = argv.length;

const cli = (argvLenght) => {
    switch (argvLenght) {
        case 0:
            { errorOptions('Error [X]: Ingresa tu ruta y opciones'); break; }
        case 1:
            { argvL1(argv[0]); break; } //solo ruta
        case 2:
            { argvL2(argv[0], argv[1]); break; } // ruta y una opcion
        case 3:
            { argvL3(argv[0], argv.slice(1, 3)); break; } // ruta y 2 opciones 
        default:
            { errorOptions('Error [X]: Opciones Invalidas'); } //ingreso mas de una opcion
    }
}
cli(argvLenght);