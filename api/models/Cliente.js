/**
 * Cliente.js
 *
 * Um cliente do nosso ecommerce.
 */

module.exports = {
    tableName: 'clientes',
    attributes: {
        nome: {
            type: 'string',
        },
        email: {
            type: 'string',
            unique: true,
        },
        login: {
            type: 'string',
            unique: true,
        },
        senha: {
            type: 'string',
        },
        endereco: {
            type: 'string',
        },
    }
};