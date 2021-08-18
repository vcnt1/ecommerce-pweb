module.exports = {
  tableName: 'categorias_produtos',
  attributes: {
      produto_id: {
          type: 'number',
          required: true,
          columnName: 'produto_id'
      },
      categoria_id: {
          type: 'number',
          required: true,
          columnName: 'categoria_id'
      },
      descricao: {
          type: 'string',
          required: true,
          columnName: 'descricao'
      }
  }
};