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
    async update(id, params) {
        let query = 'UPDATE administradores SET'
        let attributes = []

        if(params.nome) {
            attributes.push(`nome = '${params.nome}'`)
        }

        if(params.email) {
            attributes.push(query += `email = '${params.email}'`)
        }

        if(params.login) {
            attributes.push(`login = '${params.login}'`)
        }

        if(params.senha) {
            attributes.push(`login = '${params.senha}'`)
        }

        if(attributes.length == 0){
            console.log('Error: Administrador.update')
            return 'Error'
        }

        query += ` ${attributes.join(',')} WHERE id = ${id};`
        return await sails.getDatastore().sendNativeQuery(query)
    },
    async delete(id) {
        return await sails.getDatastore().sendNativeQuery('DELETE FROM administradores WHERE id = $1', [id])
    },
}