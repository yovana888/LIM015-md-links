const { getAbsolutePath, validateIfPathExists, isDirectory, getFilesMd } = require('./functions.js');

const mdLinks = (route, option = { validate: false }) => new Promise((resolve, reject) => {
    const absolutePath = getAbsolutePath(route)
    if (validateIfPathExists(absolutePath) === true) {
        if (isDirectory(absolutePath) === true) {
            const allFilesMd = getFilesMd(absolutePath); //extrae todos los md :v
            if (allFilesMd.length != 0) {
                resolve(allFilesMd);
            } else {
                reject('Error [X]: No se Encontraron Archivos con extension .md');
            }
        } else {
            resolve('archivo')
        }
    } else {
        reject('Error [X]: La ruta ingresada no existe');
    }
});




mdLinks("P:/CDMX010-data-lovers-master/readmes", { validate: true })
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error);
    });