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
    },
    async createDao(params) {
        let lastProduto = await Produto.find()
            .sort('id DESC')
            .limit(1)

        let newId = lastProduto[0] ? parseInt(lastProduto[0].id) + 1 : 1
        await sails.getDatastore().sendNativeQuery('INSERT INTO produtos(id, descricao, preco, foto, quantidade) VALUES($1, $2, $3, $4, $5);', [newId, params.descricao, params.preco, params.foto, params.quantidade])
        console.log(params.categorias)

        params.categorias.forEach(async function (categoria){
            await sails.getDatastore().sendNativeQuery('INSERT INTO categorias_produtos(produto_id, categoria_id) VALUES($1, $2);', [newId, parseInt(categoria)])
        })
    },
};