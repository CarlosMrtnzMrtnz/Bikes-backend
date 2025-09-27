
const { createUser } = require('../../controllers/user.controller');
const userModel = require( '../../models/user.models');

jest.mock( '../../models/user.models' );

describe( 'User Controller', () => {
    
    beforeEach( () => {
        req = { body: {} },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    } );

    test( 'Debe devolver un error de datos incompletos cuando se crea un usuario', async () => {
        // Given
        req.body = { 
            userName: 'Carlos',
            // <--- Dato de "email" ausente
            // <--- Dato de "password" ausente
        }

        // When
        await createUser( req, res );   // Haga uso del controlador

        // Then
        expect( res.status ).toHaveBeenCalledWith( 400 );      // Codigo de estado
        expect( res.json ).toHaveBeenCalledWith({ error: 'Datos incompletos para crear usuario' }); 
    } );

});
