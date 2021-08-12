const { mdLinks } = require('./index.js');
const { help, rptaTable, rptaError } = require('./cliFunctions.js');
const argvs = process.argv; //posicion 0: Ejecutable de node.js 1: archivo de donde se ejecuta 
const path = argvs[2]; //ruta del readme o directorio
const options = argvs.slice(3, 4); //tener los 2 options


const cli = (path, options) => {
    const predicadoHelp = path === '--help' || options.includes('--help');

    if (predicadoHelp) {
        console.log(help);
    }

    if ((predicadoHelp != true) && (options.length == 0)) { //en caso de que ingrese solo la ruta
        mdLinks(path, { validate: false })
            .then((links) => rptaTable(links))
            .catch(error => rptaError(error));
    }
}

cli(path, options);