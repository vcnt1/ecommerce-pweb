module.exports = {
    async create(params) {
        let lastCompra = await sails.getDatastore().sendNativeQuery('SELECT id FROM compras ORDER BY id DESC LIMIT 1;')
        let compraId = lastCompra.rows[0] ? parseInt(lastCompra.rows[0].id) + 1 : 1

        await sails.getDatastore().sendNativeQuery('INSERT INTO compras(id, cliente_id, data_hora) VALUES($1, $2, CURRENT_TIMESTAMP);', [compraId, params.clienteId])
        console.log(params.produtos)
        for (const id of params.produtos) {
            await sails.getDatastore().sendNativeQuery('INSERT INTO compras_produtos(produto_id, compra_id) VALUES($1, $2);', [id, compraId])
        }
    },
    async list() {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM compras;')
    }
}