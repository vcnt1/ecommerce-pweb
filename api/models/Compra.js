/**
 * Compra.js
 *
 * Uma compra realizada por um cliente.
 */

module.exports = {
    tableName: 'compras',
    attributes: {
        id: {
            type: 'number',
            required: true,
            unique: true,
            columnName: 'id'
        },
        clienteId: {
            type: 'number',
            columnName: 'cliente_id'
        },
        // dataHora: {
        //     type: 'ref',
        //     columnType: 'datetime',
        //     columnName: 'data_hora'
        // },
    },
};