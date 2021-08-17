const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');

const isDirectory = (pathValid) => fs.statSync(pathValid).isDirectory(); //devuelve true en caso de ser un directorio 

const readDirectory = (pathDirectory) => {
    let results = []; //almacena todas las rutas del los archivos md
    let files = fs.readdirSync(pathDirectory);

    files.forEach((item) => {
        let pathFile = path.join(pathDirectory, item);
        if (isDirectory(pathFile)) {
            results = results.concat(readDirectory(pathFile)); //recurse
        } else if (path.extname(pathFile) === '.md') {
            results.push(pathFile);
        }
    });
    return results;
}

const regexCorcheteParentesis = /!*\[(.+?)\]\((.+?)\)/gi; // String que cumpla: [2. Resumen del proyecto](#2-resumen-del-proyecto)
const regexUrl = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/ig;

//LEER ARCHIVO;
const readFile = (pathFile) => {
    const content = fs.readFileSync(pathFile, 'utf8', (err, data) => {
        if (err) { return 'error'; } else { return data; }
    });

    const allLinksMd = [];

    if (content == 'error') {
        const msj1 = 'No se puede leer este archivo :c';
        allLinksMd.push({ file: pathFile, href: '-', text: msj1 });
    } else {
        const resultUrl = content.match(regexCorcheteParentesis); //extrae en formato array

        resultUrl.forEach((item) => {
            let textUrl = item.match(/\[(.*)\]/).pop(); // Solo lo que se encuentre dentro de el 1er Corchetes
            let url = item.match(regexUrl); // que extraiga Solo la url
            if (url != null) {
                allLinksMd.push({
                    file: pathFile,
                    href: url[0],
                    text: textUrl.slice(0, 50)
                });
            }
        });

        const msj2 = 'No se encontro Links en este archivo';
        if (allLinksMd.length == 0) { allLinksMd.push({ file: pathFile, href: '-', text: msj2 }) }
    }
    return allLinksMd;
}

//FUNCIÓN QUE VALIDA SI LOS LINKS ESTÁN 'OK' O 'FAIL'
const validateLinks = (data) => data.map((obj) => {
    if (obj.href == '-') {
        return {
            file: obj.file,
            href: obj.href,
            text: obj.text,
            status: '-',
            message: '-'
        }
    } else {
        return fetch(obj.href)
            .then((res) => {
                return {
                    file: obj.file,
                    href: obj.href,
                    text: obj.text,
                    status: res.status,
                    message: res.statusText
                }
            })
            .catch((error) => {
                return {
                    file: obj.file,
                    href: obj.href,
                    text: obj.text,
                    status: 500,
                    message: 'FAIL',
                }
            });
    }

});

module.exports = {
    readDirectory,
    readFile,
    fs,
    path,
    isDirectory,
    validateLinks
}