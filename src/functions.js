const fs = require("fs");
const path = require("path");
const axios = require("axios");


const getAbsolutePath = (route) => {
    let absolutePath = path.normalize(route); //corregir la barras 
    absolutePath = path.resolve(absolutePath); //convierte la ruta a absoluta
    return absolutePath;
}

const validateIfPathExists = (route) => fs.existsSync(route);

const isDirectory = (route) => fs.statSync(route).isDirectory(); //devuelve true en caso de ser un directorio 


const readDirectory = (route) => {
    let allFilesMD = [];
    const files = fs.readdirSync(route); //permite leer el contenido de una carpeta 
    for (let key in files) {
        const filePath = path.join(route, files[key]);
        let getExtension = path.extname(filePath);
        if (getExtension === '.md') {

        }
    }

}
module.exports = {
    getAbsolutePath,
    validateIfPathExists,
    isDirectory,
    readDirectory
}