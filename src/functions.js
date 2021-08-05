const { readDirectory, readFile, fs, path } = require('./utils.js');

const validatePath = (pathInput) => {
    const pathNormalize = path.normalize(pathInput);; //corregir la barras 
    const pathAbsolute = path.resolve(pathNormalize); //convierte la ruta a absoluta
    const resultValidatePath = fs.existsSync(pathAbsolute) ? pathAbsolute : 'error'; //verifica si existe
    return resultValidatePath;
};

const getMdLinks = (pathValid) => {
    const allLinks = [];
    const allFilesMd = (path.extname(pathValid) === '.md') ? [pathValid] : readDirectory(pathValid);
    for (let key in allFilesMd) {
        allLinks.push({
            numFile: parseInt(key) + 1,
            pathFile: allFilesMd[key],
            links: readFile(allFilesMd[key])
        })
    }
    return allLinks;
}

const getMdlinksDetailed = (pathValid) => {
    const allLinks = getMdLinks(pathValid);

}


module.exports = {
    validatePath,
    getMdlinksDetailed,
    getMdLinks
}