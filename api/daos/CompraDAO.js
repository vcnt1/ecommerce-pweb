module.exports = {
    async abcde(params){
        Compra.query('INSET INTO compras COLUMNS(id, cliente_id, data_hora) VALUES($1, $2, $3)' , [params.id, params.clienteId] ,function(err, rawResult) {
            if (err) { return res.serverError(err); }

            sails.log(rawResult);
            return res.ok();
        });
    }
}