/**
 * Administrador.js
 *
 * Um administrador do nosso ecommerce.
 */

module.exports = {
    attributes: {
        id: {
            type: 'number',
            required: true,
            unique: true,
            columnName: 'id'
        },
        nome: {
            type: 'string',
            columnName: 'nome'
        },
        email: {
            type: 'string',
            unique: true,
            columnName: 'email'
        },
        login: {
            type: 'string',
            unique: true,
            columnName: 'login'
        },
        senha: {
            type: 'string',
            columnName: 'senha'
        },
    }
};