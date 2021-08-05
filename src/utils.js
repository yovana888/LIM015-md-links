const fs = require("fs");
const path = require("path");
const axios = require("axios");


const isDirectory = (pathValid) => fs.statSync(pathValid).isDirectory(); //devuelve true en caso de ser un directorio 

const readDirectory = (pathDirectory) => {
    let results = [];
    let files = fs.readdirSync(pathDirectory); //leer contenido de una carpeta

    for (let key in files) {
        let pathFile = path.join(pathDirectory, files[key]);
        if (isDirectory(pathFile)) {
            results = results.concat(readDirectory(pathFile)); //recurse
        } else if (path.extname(pathFile) === '.md') {
            results.push(pathFile);
        }
    }
    return results;
}


const readFile = (pathFile) => {
    const content = fs.readFileSync(pathFile, 'utf8', (err, data) => {
        if (err) { return 'error'; } else { return data; }
    });
    if (content != 'error') {
        const resultUrl = content.match(/!*\[(.+?)\]\((.+?)\)/gi); //extrae en formato array todos los regex que cumplan: [2. Resumen del proyecto](#2-resumen-del-proyecto)
        let allLinksMd = [];
        for (let key in resultUrl) {
            let textUrl = resultUrl[key].match(/\[(.*)\]/).pop(); // Solo lo que se encuentre dentro de los corchetes
            let url = resultUrl[key].match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/ig); // que extraiga solo la url
            if (url != null) {
                allLinksMd.push({
                    link: url[0],
                    text: textUrl.slice(0, 50)
                });
            }

        }
        const response = (allLinksMd.length == 0) ? 'No se encontro Links en este archivo' : allLinksMd;
        return response;
    } else {
        return 'Al paracer Hubo un error al leer este archivo :c';
    }

}

module.exports = {
    readDirectory,
    readFile,
    fs,
    path
}