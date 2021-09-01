/**
 * Compra.js
 *
 * Uma compra realizada por um cliente.
 */

module.exports = {
    tableName: 'compras',
    attributes: {
        clienteId: {
            type: 'number',
            columnName: 'cliente_id'
        },
        dataHora: {
            type: 'ref',
            //columnType: 'datetime',
            columnName: 'data_hora'
        },
    },
    async getAll() {
        let query = await sails.getDatastore().sendNativeQuery('SELECT c.id, data_hora, nome FROM compras c INNER JOIN clientes cl ON c.cliente_id = c.id;')

        let compras = query.rows
        if (compras.length == 0) {
            return []
        }

        let c = []

        for (let el of compras) {
            let produtos = await sails.getDatastore().sendNativeQuery('SELECT descricao, preco, cp.quantidade FROM compras_produtos cp INNER JOIN produtos p ON cp.produto_id = p.id WHERE cp.compra_id = $1', [el.id])
            el.produtos = produtos.rows
            c.push(el)
        }

        return c
    },
    async getByClienteId(id) {
        let query = await sails.getDatastore().sendNativeQuery('SELECT c.id, data_hora, nome FROM compras c INNER JOIN clientes cl ON c.cliente_id = c.id WHERE cl.id = $1;', [id])
        let compras = query.rows
        if (compras.length == 0) {
            return []
        }

        let c = []

        for (let el of compras) {
            let produtos = await sails.getDatastore().sendNativeQuery('SELECT descricao, preco, cp.quantidade FROM compras_produtos cp INNER JOIN produtos p ON cp.produto_id = p.id WHERE cp.compra_id = $1', [el.id])
            el.produtos = produtos.rows
            c.push(el)
        }

        console.log(c)

        return c
    },
    async delete(id) {
        await sails.getDatastore().sendNativeQuery('DELETE FROM categorias_produtos WHERE categoria_id = $1;', [id])
        await Categoria.destroyOne({id: id})
    },
};