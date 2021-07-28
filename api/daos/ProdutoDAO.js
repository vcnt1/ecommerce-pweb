module.exports = {
    async selectById(id) {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM produtos WHERE id = $1;', [id])
    },
    async list() {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM produtos;', [])
    },
    async listByDescricao(params) {
        return await sails.getDatastore().sendNativeQuery("SELECT * FROM produtos WHERE descricao = '$1';", [params.descricao])
    },
    async listByValor(params) {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM produtos WHERE valor = $1;', [params.valor])
    },
    async create(params) {
        let result = await sails.getDatastore().sendNativeQuery('SELECT id FROM produtos ORDER BY id DESC LIMIT 1;')
        let lastId = result.rowCount == 0 ? 0 : result.rows[0].id
        return await sails.getDatastore().sendNativeQuery('INSERT INTO produtos(id, descricao, preco, foto, quantidade) VALUES($1, $2, $3, $4, $5);', [lastId + 1, params.descricao, params.preco, params.foto, params.quantidade])
    },
    async delete(params) {
        return await sails.getDatastore().sendNativeQuery('DELETE FROM produtos WHERE id = $1;', [params.id])
    },
    async update(params) {
        return await sails.getDatastore().sendNativeQuery('UPDATE produtos SET valor = $2 WHERE id = $1;', [params.id, params.valor])
    },
}
