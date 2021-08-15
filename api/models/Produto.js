/**
 * Produto.js
 *
 * Um produto do nosso ecommerce.
 */

module.exports = {
    tableName: 'produtos',
    attributes: {
        id: {
            type: 'number',
            unique: true,
            required: true,
            columnName: 'id'
        },
        descricao: {
            type: 'string',
            columnName: 'descricao'
        },
        preco: {
            type: 'number',
            columnName: 'preco'
        },
        foto: {
            type: 'string',
            columnName: 'foto'
        },
        quantidade: {
            type: 'number',
            columnName: 'quantidade'
        },
    }
};