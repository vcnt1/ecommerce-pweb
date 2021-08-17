/**
 * Categoria.js
 *
 * Uma categoria de produtos do nosso ecommerce.
 */

module.exports = {
    tableName: 'categorias',
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
    },
    async deleteDao(id) {
        await sails.getDatastore().sendNativeQuery('DELETE FROM categorias_produtos WHERE categoria_id = $1;', [id])
        await Categoria.destroyOne({id: id})
    },
};