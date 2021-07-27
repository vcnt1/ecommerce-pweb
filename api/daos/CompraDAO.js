module.exports = {
    async create(params) {
        sails.getDatastore().sendNativeQuery('SELECT id FROM compras ORDER BY id DESC LIMIT 1;', [], function (e, firstResult) {
            let lastId = firstResult.rows.length == 0 ? 0 : firstResult.rows[0].id
            let compra_id = lastId + 1
            sails.getDatastore().sendNativeQuery('INSERT INTO compras(id, cliente_id, data_hora) VALUES($1, $2, CURRENT_TIMESTAMP());', [compra_id, params.cliente_id], function (err, rawResult) {
                for (i = 0; i < params.produtos.lenth; i++) {
                    sails.getDatastore().sendNativeQuery('SELECT id FROM compras_produtos ORDER BY id DESC LIMIT 1;', [], function (e, firstResult) {
                        let lastId = firstResult.rows.length == 0 ? 0 : firstResult.rows[0].id
                        sails.getDatastore().sendNativeQuery('INSERT INTO compras_produtos(produto_id, compra_id) VALUES($1, $2);', [lastId + 1, compra_id], function (err, rawResult) {
                            if (err) {
                                console.log(err)
                                return err
                            }
                        });
                    });
                }
            });
        });
    },
    async list() {
        sails.getDatastore().sendNativeQuery('SELECT * FROM compras;', [], function (err, rawResult) {
            if (e) {
                console.log(err)
                return err
            }
            console.log(rawResult)
            return rawResult;
        });
    }
}