const methods = require('../src/functions.js');

const arrayLinks = [{
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md',
        href: 'https://www.heroku.com/',
        text: 'Run Project'
    },
    {
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md',
        href: 'https://github.com/yovana888/',
        text: 'Github'
    },
    {
        file: "C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md",
        href: "https://www.npmjs.c/",
        text: "npm",
    }
];

const arrayLinksStatus = [{
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md',
        href: 'https://www.heroku.com/',
        text: 'Run Project',
        status: 200,
        message: 'OK'
    },
    {
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md',
        href: 'https://github.com/yovana888/',
        text: 'Github',
        status: 200,
        message: 'OK'
    },
    {
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md',
        href: 'https://www.npmjs.c/',
        text: 'npm',
        status: 500,
        message: 'FAIL'
    }
];

const arrayStatusNotLinks = [{
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra2\\extra\\ReadmeRecursivo.md',
        href: 'https://www.heroku.com/',
        text: 'Run Project',
        status: 200,
        message: 'OK'
    },
    {
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra2\\ReadmeNotLink.md',
        href: '-',
        text: 'No se encontro Links en este archivo',
        status: '-',
        message: '-'
    }
]



describe('Métodos para extraer los links y la ruta', () => {

    //------validatePath()-----------

    it('validatePath(), es una función', () => {
        expect(typeof methods.validatePath).toBe('function');
    });
    it('validatePath(), debería retornar la ruta absoluta si existe', () => {
        const result = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\README.md';
        expect(methods.validatePath('./README.md')).toBe(result);
    });
    it('validePath(), debería retornar error si es una ruta no existente', () => {
        expect(methods.validatePath('../READ.md')).toBe('error');
    });

    //------getMdLinks()-----------

    it('getMdLinks(), es una función', () => {
        expect(typeof methods.getMdLinks).toBe('function');
    });
    it('getMdLinks(), debería retornar error en caso de que la ruta no sea directorio o un .md', () => {
        const pathValid = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\cli.js'
        const result = 'Error [X]: La ruta del archivo no tiene extension .md'
        expect(methods.getMdLinks(pathValid)).toBe(result);
    });
    it('getMdLinks(), debería retornar los links de un archivo.md', () => {
        const pathValid = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md'
        expect(methods.getMdLinks(pathValid)).toEqual(arrayLinks);
    });
    it('getMdLinks(), debería retornar los links de un directorio', () => {
        const pathValid = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra'
        expect(methods.getMdLinks(pathValid)).toEqual(arrayLinks);
    });

    //------ getMdlinksDetailed()-----------
    it('getMdlinksDetailed(), es una función', () => {
        expect(typeof methods.getMdlinksDetailed).toBe('function');
    });

    it('getMdlinksDetailed(), debería retornar error en caso de que la ruta no sea directorio o un .md', () => {
        const pathValid = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\cli.js'
        const result = 'Error [X]: La ruta del archivo no tiene extension .md'
        expect(methods.getMdlinksDetailed(pathValid)).toBe(result);
    });

    it('getMdlinksDetailed(), debería retornar un obj con los links y su status', () => {
        const pathValid = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md';
        return methods.getMdlinksDetailed(pathValid)
            .then((res) => {
                expect(res).toEqual(arrayLinksStatus)
            })
    }, 9000);

    it('getMdlinksDetailed() para lectura a un directorio con un md sin links', () => {
        const pathValid = 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra2';
        return methods.getMdlinksDetailed(pathValid)
            .then((res) => {
                expect(res).toEqual(arrayStatusNotLinks)
            })
    });


});