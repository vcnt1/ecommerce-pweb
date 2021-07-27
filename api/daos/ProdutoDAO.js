module.exports = {
    async list() {
        sails.getDatastore().sendNativeQuery('SELECT * FROM produtos;', [], function (err, rawResult) {
            if (e) {
                console.log(err)
                return err
            }
            console.log(rawResult)
            return rawResult;
        });
    },
    async listByDescricao(params) {
        sails.getDatastore().sendNativeQuery("SELECT * FROM produtos WHERE descricao = '$1';", [params.descricao], function (err, rawResult) {
            if (err) {
                console.log(err)
                return err
            }
            console.log(rawResult)
            return rawResult;
        });
    },
    async listByValor(params) {
        sails.getDatastore().sendNativeQuery('SELECT * FROM produtos WHERE valor = $1;', [params.valor], function (err, rawResult) {
            if (err) {
                console.log(err)
                return err
            }
            console.log(rawResult)
            return rawResult;
        });
    },
    async create(params) {
        sails.getDatastore().sendNativeQuery('SELECT id FROM produtos ORDER BY id DESC LIMIT 1;', [], function (e, firstResult) {
            let lastId = firstResult.rows.length == 0 ? 0 : firstResult.rows[0].id
            sails.getDatastore().sendNativeQuery('INSERT INTO produtos(id, descricao, preco, foto, quantidade) VALUES($1, $2, $3, $4, $5);', [lastId + 1, params.descricao, params.preco, params.foto, params.quantidade], function (err, rawResult) {
                    if (err) {
                        console.log(err)
                        return err
                    }
                    console.log(rawResult)
                    return rawResult;
            });
        });
    },
    async selectById(params) {
        sails.getDatastore().sendNativeQuery('SELECT * FROM produtos WHERE id = $1;', [params.id], function (err, rawResult) {
            if (err) {
                console.log(err)
                return err
            }
            console.log(rawResult)
            return rawResult;
        });
    },
    async delete(params) {
        sails.getDatastore().sendNativeQuery('DELETE FROM produtos WHERE id = $1;', [params.id], function (err) {
            if (err) {
                console.log(err)
                return err
            }
        });
    },
    async update(params) {
        sails.getDatastore().sendNativeQuery('UPDATE produtos SET valor = $2 WHERE id = $1;', [params.id, params.valor], function (err, rawResult) {
            if (err) {
                console.log(err)
                return err
            }
        });
    },

}