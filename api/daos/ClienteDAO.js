module.exports = {
    async list() {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM clientes;')
    },
    async selectById(id) {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM clientes WHERE id = $1;', [id])
    },
    async create(params) {
        let lastId = await sails.getDatastore().sendNativeQuery('SELECT id FROM clientes ORDER BY id DESC LIMIT 1;')
        return await sails.getDatastore().sendNativeQuery('INSERT INTO clientes(id, nome, endereco, email, login, senha) VALUES($1, $2, $3, $4, $5, $6);', [lastId + 1, params.nome, params.endereco, params.email, params.login, params.senha])
    },
    async update(params) {
        let query = 'UPDATE clientes SET'
        if(params.nome) {
            query += ` nome = ${params.nome},`
        }

        if(params.email) {
            query += ` email = ${params.email},`
        }

        if(params.endereco) {
            query += ` endereco = ${params.endereco},`
        }

        query += 'WHERE id = ' + params.id + ';'

        return await sails.getDatastore().sendNativeQuery(query)
    },
    async deleteById(id) {
        return await sails.getDatastore().sendNativeQuery('DELETE FROM clientes WHERE id = $1', [id])
    },
}