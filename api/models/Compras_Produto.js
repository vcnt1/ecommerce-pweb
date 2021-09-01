module.exports = {
    tableName: 'compras_produtos',
    attributes: {
        produto_id: {
            type: 'number',
            required: true,
            columnName: 'produto_id'
        },
        compra_id: {
            type: 'number',
            required: true,
            columnName: 'compra_id'
        },
        quantidade: {
            type: 'number',
            required: true,
            columnName: 'quantidade'
        },
        
    }
  };