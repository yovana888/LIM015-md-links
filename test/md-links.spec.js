const methods = require('../src/index.js');

describe('prueba', () => {
    it('verificar si prueba es una funcion', () => {
        expect(typeof methods.prueba).toBe('function');
    });

    it("Debería retornar `Hola Mundo`", () => {
        expect(methods.prueba()).toBe('Hola Mundo');
    });

});