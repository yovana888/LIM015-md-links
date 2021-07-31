const { getAbsolutePath, validateIfPathExists, isDirectory } = require('./functions.js');

const mdLinks = (route, option = { validate: false }) => new Promise((resolve, reject) => {
    const absolutePath = getAbsolutePath(route)
    if (validateIfPathExists(absolutePath) === true) {
        if (isDirectory(absolutePath) === true) {
            const getFilesMd = readDirectory(absolutePath);
        } else {
            resolve('archivo')
        }
    } else {
        reject('Error [X]: La ruta ingresada no existe');
    }
});




mdLinks("P:/CDMX010-data-lovers-master/src/main.js", { validate: true })
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error);
    });