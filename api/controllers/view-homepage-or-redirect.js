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

        let lastCliente = await Cliente.find()
            .sort('id DESC')
            .limit(1)

        let newId = lastCliente[0] ? parseInt(lastCliente[0].id) + 1 : 1
        let newUserRecord = await Cliente.create({
                id: newId,
                nome: 'nome',
                email: 'email',
                login: 'login',
                senha: 'senha',
                endereco: 'endereco',
            }
        ).fetch();

        console.log(newUserRecord)
    }
};
