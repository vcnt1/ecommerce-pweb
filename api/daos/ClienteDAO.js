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

        if(params.endereco) {
            attributes.push(`endereco = '${params.endereco}'`)
        }

        if(attributes.length == 0){
            console.log('Error: Cliente.update')
            return 'Error'
        }

        query += ` ${attributes.join(',')} WHERE id = ${params.id};`

        return await sails.getDatastore().sendNativeQuery(query)
    },
    async deleteById(id) {
        return await sails.getDatastore().sendNativeQuery('DELETE FROM clientes WHERE id = $1', [id])
    },
}