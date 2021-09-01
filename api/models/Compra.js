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
        let query = await sails.getDatastore().sendNativeQuery('SELECT c.id, data_hora, nome, p.descricao, p.preco, cp.quantidade \n' +
            'FROM compras c \n' +
            'INNER JOIN clientes cl ON c.cliente_id = cl.id \n' +
            'INNER JOIN compras_produtos cp ON cp.compra_id = c.id \n' +
            'INNER JOIN produtos p ON cp.produto_id = p.id;')
        return query.rows
    },
    async getByClienteId(id) {
        let query = await sails.getDatastore().sendNativeQuery('SELECT c.id, data_hora, nome \n' +
            'FROM compras c \n' +
            'INNER JOIN clientes cl ON c.cliente_id = cl.id \n' +
            'INNER JOIN compras_produtos cp ON cp.compra_id = c.id \n' +
            'INNER JOIN produtos p ON cp.produto_id = p.id WHERE cl.id = $1;', [id])
        let compras = query.rows
        if (compras.length == 0) {
            return []
        }

        let comprasComplete = async (compras) => {
            let c = []
            compras.map(async (el) => {
                let produtos = await sails.getDatastore().sendNativeQuery('SELECT descricao, preco, cp.quantidade FROM compras_produtos cp INNER JOIN produtos p ON cp.produto_id = p.id WHERE cp.compra_id = $1', [el.id])
                el.produtos = produtos.rows
                c.push(el)
            })
            return c
        }

        let porFavor = await comprasComplete(compras)
        return porFavor
    },
    async delete(id) {
        await sails.getDatastore().sendNativeQuery('DELETE FROM categorias_produtos WHERE categoria_id = $1;', [id])
        await Categoria.destroyOne({id: id})
    },
};