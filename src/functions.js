const { readDirectory, readFile, fs, path, validateLinks, isDirectory } = require('./utils.js');
const validatePath = (pathInput) => {
    const pathNormalize = path.normalize(pathInput); //corregir la barras 
    const pathAbsolute = path.resolve(pathNormalize); //convierte la ruta a absoluta
    const resultValidatePath = fs.existsSync(pathAbsolute) ? pathAbsolute : 'error'; //verifica si existe
    return resultValidatePath;
};

const getMdLinks = (pathValid) => {
    const allFilesMd = (isDirectory(pathValid)) ? readDirectory(pathValid) : (path.extname(pathValid) === '.md') ? [pathValid] : 'error';
    if (allFilesMd == 'error') {
        return 'Error [X]: La ruta del archivo no tiene extension .md'
    } else {
        let allLinksMd = allFilesMd.map((elemento) => readFile(elemento));
        return allLinksMd.flat(); //se crea un nuevo arreglo con todos los elementos de los subarreglos concatenados a él de forma recursiva    
    }
}

const getMdlinksDetailed = (pathValid) => {
    const arrayLinks = getMdLinks(pathValid);
    if (arrayLinks.includes('Error')) {
        return arrayLinks;
    } else {
        console.log('Procesando...');
        const respuesta = Promise.all(validateLinks(arrayLinks))
            .then((res) => {
                return (res) //creo la promesa
            })
        return respuesta;
    }
}

module.exports = {
    validatePath,
    getMdlinksDetailed,
    getMdLinks
}