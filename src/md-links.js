const { validatePath, getMdlinksDetailed, getMdLinks } = require('./functions.js');

const mdLinks = (path, option = { validate: false }) => new Promise((resolve, reject) => {
    const pathValid = validatePath(path);
    if (pathValid != 'error') {
        if (option.validate === true) {
            resolve(getMdlinksDetailed(pathValid));
        } else {
            resolve(getMdLinks(pathValid));
        }
    } else {
        reject('Error [X]: La ruta ingresada no existe')
    }
});

module.exports = {
    mdLinks
}