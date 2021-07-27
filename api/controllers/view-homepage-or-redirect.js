const ClienteDAO = require("../daos/ClienteDAO");
const CompraDAO = require("../daos/CompraDAO");

module.exports = {


    friendlyName: 'View homepage or redirect',


    description: 'Display or redirect to the appropriate homepage, depending on login status.',


    exits: {

        success: {
            statusCode: 200,
            description: 'Requesting user is a guest, so show the public landing page.',
            viewTemplatePath: 'pages/homepage'
        },

        redirect: {
            responseType: 'redirect',
            description: 'Requesting user is logged in, so redirect to the internal welcome page.'
        },

    },


    fn: async function () {
        let clientes = await ClienteDAO.list();

        if(clientes.rows == 'undefined') {}

        return {
            clientes: clientes.rows
        };
    }
};
