module.exports = {
    async list() {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM administradores;')
    },
    async selectById(id) {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM administradores WHERE id = $1;', [id])
    },
    async create(params) {
        let lastId = await sails.getDatastore().sendNativeQuery('SELECT id FROM clientes ORDER BY id DESC LIMIT 1;')
        return await sails.getDatastore().sendNativeQuery('INSERT INTO administradores(id, nome, email, login, senha) VALUES($1, $2, $3, $4, $5);', [lastId + 1, params.nome, params.email, params.login, params.senha])
    },
    async update(params) {
        let query = 'UPDATE administradores SET'
        if(params.nome) {
            query += ` nome = ${params.nome},`
        }

        if(params.email) {
            query += ` email = ${params.email}`
        }

        query += ' WHERE id = ' + params.id + ';'

        return await sails.getDatastore().sendNativeQuery(query)
    },
    async deleteById(id) {
        return await sails.getDatastore().sendNativeQuery('DELETE FROM administradores WHERE id = $1', [id])
    },
}