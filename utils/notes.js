/** Pruebas unitarias:
 *  Probar funcionalidades unicas
 */

// Probarla como una unidad
function sumarNotas ( lista ) {
    let totalNotas = 0;

    for( let i = 0; i < lista.length; i++ ) {
        totalNotas = totalNotas + lista[ i ].notaFinal;
    }

    return totalNotas;
}

// Probarla como una unidad
function promedio( total, cantNotas ) { 
    // throw new Error();
    // throw new TypeError();

    if( typeof total !== 'number' || typeof cantNotas !== 'number' ) {
        throw new Error( 'Parámetros inválidos' );
    } 

    if( cantNotas === 0 ) {
        return 0;
    }

    return total / cantNotas;       // 31 / 0 (Infinito)
}


module.exports = {
    sumarNotas,
    promedio
}
