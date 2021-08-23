const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');

//devuelve true en caso de ser un directorio 
const isDirectory = (pathValid) => fs.statSync(pathValid).isDirectory();

const readDirectory = (pathDirectory) => {
    let results = []; //almacena todas las rutas del los archivos md
    let files = fs.readdirSync(pathDirectory); //lee directorio

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

// String que cumpla: [2. Resumen del proyecto](#2-resumen-del-proyecto)
const regexCorcheteParentesis = /!*\[(.+?)\]\((.+?)\)/gi;
const regexUrl = /\(((?:\/|https?:\/\/).*)\)/gi;

//LEER ARCHIVO;
const readFile = (pathFile) => {
    const content = fs.readFileSync(pathFile, 'utf8');

    const allLinksMd = [];
    const resultUrl = content.match(regexCorcheteParentesis); //extrae en formato array

    for (let key in resultUrl) {
        let textUrl = resultUrl[key].match(/\[(.*)\]/).pop(); // Solo lo que se encuentre dentro de los corchetes
        let url = resultUrl[key].match(regexUrl); // que extraiga solo la url
        if (url != null) {
            allLinksMd.push({
                file: pathFile,
                href: url[0].slice(1, -1),
                text: textUrl.slice(0, 50)
            });
        }

    }

    const msj2 = 'No se encontro Links en este archivo';
    if (allLinksMd.length == 0) { allLinksMd.push({ file: pathFile, href: '-', text: msj2 }) }

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
        const respuesta = fetch(obj.href)
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
        return respuesta
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