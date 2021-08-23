const mdLinks = require('../src/md-links.js');
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
        file: 'C:\\Users\\HP\\Desktop\\Proyectos_GitHub\\LIM015-md-links\\src\\readmes\\extra\\README1.md',
        href: 'https://www.npmjs.c/',
        text: 'npm'
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
//con este array se prueba la recursividad el status y en caso de que no haya links en un archivo

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

describe('mdLinks', () => {
    it('verificar si mdLinks es una funcion', () => {
        expect(typeof mdLinks.mdLinks).toBe('function');
    });

    it('resolve mdlinks para option validate:false y la ruta como directorio', () => {
        return mdLinks.mdLinks('./src/readmes/extra', { validate: false })
            .then((res) => {
                expect(res).toEqual(arrayLinks)
            })
    });

    it('resolve mdlinks sin el segundo argumento', () => {
        return mdLinks.mdLinks('./src/readmes/extra/README1.md')
            .then((res) => {
                expect(res).toEqual(arrayLinks)
            })
    });

    it('resolve mdlinks para option validate:true', () => {
        return mdLinks.mdLinks('./src/readmes/extra/README1.md', { validate: true })
            .then((res) => {
                expect(res).toEqual(arrayLinksStatus)
            })
    }, 30000);

    it('resolve mdlinks para option validate:true y da lectura a un directorio con un md sin links', () => {
        return mdLinks.mdLinks('./src/readmes/extra2', { validate: true })
            .then((res) => {
                expect(res).toEqual(arrayStatusNotLinks)
            })
    });

    it('mensaje de mdlinks para archivo sin extension .md con option false', () => {
        return mdLinks.mdLinks('./src/cli.js', { validate: false })
            .then((res) => {
                expect(res).toEqual('Error [X]: La ruta del archivo no tiene extension .md')
            })
    });

    it('mensaje de mdlinks para archivo sin extension .md con option true', () => {
        return mdLinks.mdLinks('./src/cli.js', { validate: true })
            .then((res) => {
                expect(res).toEqual('Error [X]: La ruta del archivo no tiene extension .md')
            })
    });

    it('reject mdlinks por ruta que no existe', () => {
        expect.assertions(1);
        return mdLinks.mdLinks('./src/readmes/extra/READ.md', { validate: false })
            .catch((err) => {
                expect(err).toBe('Error [X]: La ruta ingresada no existe')
            })
    });

});