module.exports = {
    async list() {
        sails.getDatastore().sendNativeQuery('SELECT * FROM categorias;', [], function (err, rawResult) {
            if (e) {
                console.log(err)
                return err
            }
            console.log(rawResult)
            return rawResult;
        });
    },
    async selectByDescricao(params) {
        sails.getDatastore().sendNativeQuery("SELECT * FROM categorias WHERE descricao = '$1';", [params.descricao], function (err, rawResult) {
            if (err) {
                console.log(err)
                return err
            }
            console.log(rawResult)
            return rawResult;
        });
    },
    async create(params) {
        sails.getDatastore().sendNativeQuery('SELECT id FROM categorias ORDER BY id DESC LIMIT 1;', [], function (e, firstResult) {
            let lastId = firstResult.rows.length == 0 ? 0 : firstResult.rows[0].id
            sails.getDatastore().sendNativeQuery('INSERT INTO produtos(id, descricao) VALUES($1, $2);', [lastId + 1, params.descricao], function (err, rawResult) {
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
        sails.getDatastore().sendNativeQuery('SELECT * FROM categorias WHERE id = $1;', [params.id], function (err, rawResult) {
            if (err) {
                console.log(err)
                return err
            }
            console.log(rawResult)
            return rawResult;
        });
    },
    async delete(params) {
        sails.getDatastore().sendNativeQuery('DELETE FROM categorias WHERE id = $1;', [params.id], function (err) {
            if (err) {
                console.log(err)
                return err
            }
        });
    },
    async update(params) {
        sails.getDatastore().sendNativeQuery('UPDATE categorias SET descricao = $2 WHERE id = $1;', [params.id, params.descricao], function (err, rawResult) {
            if (err) {
                console.log(err)
                return err
            }
        });
    },

}