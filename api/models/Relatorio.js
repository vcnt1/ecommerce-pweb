/**
 *
 * Relatorio.js
 *
 **/

module.exports = {
    attributes: {
    },
    async getTotalComprasPorCliente(dataInicio, dataFim) {
        let query = await sails.getDatastore().sendNativeQuery(`
          SELECT c2.id, c2.nome, COUNT(c1.id) AS total_compras FROM compras AS c1, clientes AS c2 WHERE c1.cliente_id = c2.id AND DATE(data_hora) >= $1
            AND DATE(data_hora) <= $2 GROUP BY c2.id, c2.nome ORDER BY total_compras DESC;`, [dataInicio, dataFim]
        )

        return query.rows
    },
    async getProdutosIndisponiveis() {
        let query = await sails.getDatastore().sendNativeQuery('SELECT p.id, p.descricao, p.preco FROM produtos AS p WHERE p.quantidade = 0 ORDER BY p.descricao ASC;')
        return query.rows
    },
    async getTotalApuradoPorData(dataInicio, dataFim) {
        let query = await sails.getDatastore().sendNativeQuery(`
            SELECT DATE(data_hora) as data, SUM(p.preco * cp.quantidade) AS total FROM compras AS c, compras_produtos AS cp, produtos AS p 
            WHERE c.id = cp.compra_id AND cp.produto_id = p.id AND DATE(data_hora) >= $1
            AND DATE(data_hora) <= $2 GROUP BY DATE(data_hora) ORDER BY data ASC;`, [dataInicio, dataFim]
        )
        return query.rows
    },
};