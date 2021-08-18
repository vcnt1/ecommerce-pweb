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

        params.categorias.forEach(async function (categoria) {
            let result = await sails.getDatastore().sendNativeQuery('SELECT descricao from categorias where id = $1', [parseInt(categoria)])

            const categoriaDescricao = result.rowCount == 0 ? 0 : result.rows[0].descricao;
            await sails.getDatastore().sendNativeQuery('INSERT INTO categorias_produtos(produto_id, categoria_id, descricao) VALUES($1, $2, $3);', [newId, parseInt(categoria), categoriaDescricao])
        })
    },
    async updateDao(params, categorias) {
        let produtoId = parseInt(params.id)

        await Produto.updateOne({
            id: produtoId
        }).set(params)

        if (categorias) {
            await sails.getDatastore().sendNativeQuery('DELETE FROM categorias_produtos WHERE produto_id = $1', [produtoId])

            categorias.forEach(async function (categoria) {
                await sails.getDatastore().sendNativeQuery('INSERT INTO categorias_produtos(produto_id, categoria_id, descricao) VALUES($1, $2, $3);', [produtoId, parseInt(categoria), categoria.descricao])
            })
        }
    },
    async getCategorias(id) {
        let categoriasQuery = await sails.getDatastore().sendNativeQuery('SELECT cp.descricao FROM categorias_produtos cp INNER JOIN categorias cat ON cat.id = cp.categoria_id WHERE cp.produto_id = $1;', [id])

        if (categoriasQuery.rowCount == 0) return 'Nenhuma'

        let categorias = []
        categoriasQuery.rows.forEach(function (el) {
            categorias.push(el.descricao)
        })

        return categorias.join(', ')
    },
    async deleteDao(id) {
        await sails.getDatastore().sendNativeQuery('DELETE FROM categorias_produtos WHERE produto_id = $1;', [id])
        await Produto.destroyOne({id: id})
    },
    async getByCategorias() {
      let categoriasQuery = await sails.getDatastore().sendNativeQuery('SELECT p.id, p.descricao, preco, foto, quantidade, cat.descricao FROM produtos p INNER JOIN categorias_produtos cp ON cp.produto_id = p.id INNER JOIN categorias cat on cat.id = cp.categoria_id;', [])
      if (categoriasQuery.rowCount == 0) return 'Nenhuma'

      let categorias = []
      categoriasQuery.rows.forEach(function (el) {
          categorias.push(el)
      })
      return categorias
  },
};