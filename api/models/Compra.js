/**
 * Compra.js
 *
 * Uma compra realizada por um cliente.
 */

module.exports = {
    tableName: 'compras',
    attributes: {
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