/**
 * Categoria.js
 *
 * Uma categoria de produtos do nosso ecommerce.
 */

module.exports = {
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
    }
};