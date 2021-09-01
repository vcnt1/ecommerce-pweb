module.exports = {
    async create(params) {
        let lastCompra = await sails.getDatastore().sendNativeQuery('SELECT id FROM compras ORDER BY id DESC LIMIT 1;')
        let compraId = lastCompra.rows[0] ? parseInt(lastCompra.rows[0].id) + 1 : 1

        await sails.getDatastore().sendNativeQuery('INSERT INTO compras(id, cliente_id, data_hora) VALUES($1, $2, CURRENT_TIMESTAMP);', [compraId, params.clienteId])
        console.log(params.produtos)
        for (const produto of params.produtos) {
            await sails.getDatastore().sendNativeQuery('INSERT INTO compras_produtos(produto_id, compra_id, quantidade) VALUES($1, $2, $3);', [produto.id, compraId, produto.quantidade])
            await sails.getDatastore().sendNativeQuery('UPDATE produtos set quantidade = (select quantidade from produtos where id= $1) - $2 where id = $1',[produto.id,produto.quantidade])
        }
    },
    async list() {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM compras;')
    }
}