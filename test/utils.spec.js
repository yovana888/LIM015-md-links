const { readDirectory, readFile, isDirectory } = require('../src/utils.js');


const allFilesMD = [
    'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md',
    'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\README2.md',
    'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\README3.md'
];

const allLinks = [{
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\README2.md',
        href: 'https://github.com/matiassingers/awesome-readme',
        text: 'awesome-readme'
    },
    {
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\README2.md',
        href: 'https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46',
        text: 'fvcproductions'
    }
];


describe('utils para functions.js', () => {

    //------isDirectory()-------------

    it('isDirectory(), es una función', () => {
        expect(typeof isDirectory).toBe('function');
    });
    it('isDirectory(), debería retornar true si es un directorio', () => {
        const path = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes';
        expect(isDirectory(path)).toBe(true);
    });

    //------readDirectory()-----------

    it('readDirectory(), es una función', () => {
        expect(typeof readDirectory).toBe('function');
    });
    it('isDirectory(), debería retornar un array con todos los archivos md', () => {
        const path = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes';
        expect(readDirectory(path)).toEqual(allFilesMD);
    });

    //------readFile()------------------

    it('readFile(), es una función', () => {
        expect(typeof readFile).toBe('function');
    });

    it('readFile(), debería retornar un objeto con todos los links de un archivo', () => {
        const path = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\README2.md';
        expect(readFile(path)).toEqual(allLinks);
    });

});