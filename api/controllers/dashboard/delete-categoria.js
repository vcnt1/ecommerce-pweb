module.exports = {


    friendlyName: 'View welcome page after delete categoria',


    description: 'Display the welcome page after deleting the product',

    inputs: {

        categoria_id: {
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


    fn: async function ({categoria_id}) {
        await Categoria.deleteDao(categoria_id)

        this.res.redirect('/welcome');
    }

};
