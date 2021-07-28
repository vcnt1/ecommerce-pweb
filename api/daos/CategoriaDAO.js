module.exports = {
    async list() {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM categorias;', [])
    },
    async selectByDescricao(params) {
        return await sails.getDatastore().sendNativeQuery("SELECT * FROM categorias WHERE descricao = '$1';", [params.descricao])
    },
    async create(params) {
        let result = await sails.getDatastore().sendNativeQuery('SELECT id FROM categorias ORDER BY id DESC LIMIT 1;')
        let lastId = result.rowCount == 0 ? 0 : result.rows[0].id
        return await sails.getDatastore().sendNativeQuery('INSERT INTO categorias(id, descricao) VALUES($1, $2);', [lastId + 1, params.descricao])
    },
    async selectById(params) {
        return await sails.getDatastore().sendNativeQuery('SELECT * FROM categorias WHERE id = $1;', [params.id])
    },
    async delete(params) {
        return await sails.getDatastore().sendNativeQuery('DELETE FROM categorias WHERE id = $1;', [params.id])
    },
    async update(params) {
        return await sails.getDatastore().sendNativeQuery('UPDATE categorias SET descricao = $2 WHERE id = $1;', [params.id, params.descricao])
    },

}