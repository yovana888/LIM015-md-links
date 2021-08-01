const fs = require("fs");
const path = require("path");
const axios = require("axios");
const filehound = require('filehound');


const getAbsolutePath = (route) => {
    let absolutePath = path.normalize(route); //corregir la barras 
    absolutePath = path.resolve(absolutePath); //convierte la ruta a absoluta
    return absolutePath;
}

const validateIfPathExists = (route) => fs.existsSync(route);

const isDirectory = (route) => fs.statSync(route).isDirectory(); //devuelve true en caso de ser un directorio 

const getFilesMd = (route) => {
    var results = [];
    var files = fs.readdirSync(route); //leer contenido de una carpeta

    for (let key in files) {
        var filename = path.join(route, files[key]);
        if (isDirectory(filename) === true) {
            results = results.concat(getFilesMd(filename)); //recurse
        } else if (path.extname(filename) === '.md') {
            results.push(filename);
        }
    }
    return results;
}



module.exports = {
    getAbsolutePath,
    validateIfPathExists,
    isDirectory,
    getFilesMd
}