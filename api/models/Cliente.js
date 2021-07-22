/**
 * Cliente.js
 *
 * Um cliente do nosso ecommerce.
 */

module.exports = {
    attributes: {
        id: {
            type: 'number',
            unique: true,
            required: true,
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
        endereco: {
            type: 'string',
            columnName: 'endereco'
        },
    }
};