module.exports = {


    friendlyName: 'View welcome page after delete categoria',


    description: 'Display the welcome page after deleting the product',

    inputs: {

        admin_id: {
            required: true,
            type: 'number',
        },

    },
    exits: {

        success: {
            viewTemplatePath: 'pages/dashboard/welcome',
            description: 'Display the welcome page after creating the category'
        },

        produtoAlreadyExists: {
            statusCode: 409,
            description: 'The provided description already exists',
        },

    },


    fn: async function ({admin_id}) {
        await Administrador.destroyOne({id: admin_id})

        delete this.req.session.userId;
        delete this.req.session.login;
        delete this.req.session.isAdmin;
        this.res.redirect('/login');
    }

};
