const { readDirectory, readFile, fs, path, validateLinks } = require('./utils.js');
const validatePath = (pathInput) => {
    const pathNormalize = path.normalize(pathInput);; //corregir la barras 
    const pathAbsolute = path.resolve(pathNormalize); //convierte la ruta a absoluta
    const resultValidatePath = fs.existsSync(pathAbsolute) ? pathAbsolute : 'error'; //verifica si existe
    return resultValidatePath;
};

const getMdLinks = (pathValid) => {
    const allFilesMd = (path.extname(pathValid) === '.md') ? [pathValid] : readDirectory(pathValid);
    let allLinksMd = allFilesMd.map((elemento) => {
        return readFile(elemento)
    })
    return allLinksMd.flat(); //se crea un nuevo arreglo con todos los elementos de los subarreglos concatenados a él de forma recursiva
}

const getMdlinksDetailed = (pathValid) => {
    const arrayLinks = getMdLinks(pathValid);
    console.log('Procesando...');
    const respuesta = Promise.all(validateLinks(arrayLinks))
        .then((res) => {
            return (res) //creo la promesa
        })
    return respuesta;
}

module.exports = {
    validatePath,
    getMdlinksDetailed,
    getMdLinks
}