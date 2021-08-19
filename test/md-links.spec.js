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
    }
];

describe('mdLinks', () => {
    it('verificar si mdLinks es una funcion', () => {
        expect(typeof mdLinks.mdLinks).toBe('function');
    });

    it('resolve para option validate:false', () => {
        mdLinks.mdLinks('../src/readmes/extra/README1.md', { validate: false })
            .then((res) => {
                expect(res).toEqual(arrayLinks)
            }).catch(error => {
                expect(error).toBe('Error [X]: La ruta ingresada no existe')
            });
    });


    it('resolve para option validate:true', () => {
        mdLinks.mdLinks('../src/readmes/extra/README1.md', { validate: true })
            .then((res) => {
                expect(res).toEqual(arrayLinksStatus)
            }).catch(error => {
                expect(error).toBe('Error [X]: La ruta ingresada no existe')
            });
    });

    it('reject para la ruta que no existe', () => {
        mdLinks.mdLinks('../src/readmes/extra/REE1.md', { validate: false })
            .then((res) => {
                expect(res).toEqual(arrayLinks)
            }).catch(error => {
                expect(error).toBe('Error [X]: La ruta ingresada no existe')
            });
    });
});