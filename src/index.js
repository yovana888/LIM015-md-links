const { validatePath, getMdlinksDetailed, getMdLinks } = require('./functions.js');

const mdLinks = (path, option = { validate: false }) => new Promise((resolve, reject) => {
    const pathValid = validatePath(path);
    if (pathValid != 'error') {
        switch (option.validate) {
            case true:
                { resolve(getMdlinksDetailed(pathValid)); break; }
            case false:
                { resolve(getMdLinks(pathValid)); break; }
            default:
                { reject('Error [X]: El segundo parametro es valido si es: `{validate: true} o {validate: false}`, alternativamente puede omitirlo') }
        }
    } else {
        reject('Error [X]: La ruta ingresada no existe')
    }
});

module.exports = {
    mdLinks
}