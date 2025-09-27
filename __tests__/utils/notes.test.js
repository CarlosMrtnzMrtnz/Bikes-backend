const { promedio } = require("../../utils/notes");

describe( 'Testing /utils/notes.js', () => {

    it( 'Debe calcular el promedio correctamente', () => {
        // Given (Dado): 
        const total = 7.5;
        const cantidadNotas = 3;

        // When (Cuando):
        const resultado = promedio( total, cantidadNotas );     // 

        // Then (Entonces): Afirmaciones
        expect( resultado ).toBe( 2.5 );

    } ); 

    // it( 'Debe calcular el promedio bien', () => {
    //     expect( promedio( 7.5, 3 ) ).toBe( 2.5 );
    // } );

    test( 'Debe devolver "division por cero indefinida" ', () => {
        // Given: 
        const total = 31;
        const cantidadNotas = 0;

        // When:
        const resultado = promedio( total, cantidadNotas );

        // Then:
        expect( resultado ).toBe( 0 );
    } );

    test( 'Debe lanzar un error si uno de los dos parametros es diferente a un "number"', () => {
        // Given:
        const total = '5';
        const cantidadNotas = '2'

        // When:
        const resultado = () => promedio( total, cantidadNotas );

        // Then:
        expect( resultado ).toThrow( Error );
        expect( resultado ).toThrow( 'Parámetros inválidos' ); // valida el mensaje exacto
    } );

} );
