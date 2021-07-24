module.exports = {
    async create(params){
        sails.getDatastore().sendNativeQuery('SELECT id FROM clientes ORDER BY id DESC LIMIT 1;', [], function(e, firstResult) {
            let lastId = firstResult.rows.length == 0 ? 0 : firstResult.rows[0].id
            sails.getDatastore().sendNativeQuery('INSERT INTO clientes(id, nome, endereco, email, login, senha) VALUES($1, $2, $3, $4, $5, $6);' , [lastId + 1, params.nome, params.endereco, params.email, params.login, params.senha ] ,function() {
                sails.getDatastore().sendNativeQuery('SELECT * FROM clientes WHERE id = $1;' , [params.id] ,function(err, rawResult) {
                    if (err) {
                        console.log(err)
                        return err
                    }
                    console.log(rawResult)
                    return rawResult;
                });
            });
        });
    }
}