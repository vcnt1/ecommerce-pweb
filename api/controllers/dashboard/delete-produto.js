module.exports = {


    friendlyName: 'View welcome page after delete produto',


    description: 'Display the welcome page after deleting the product',

    inputs: {

        produto_id: {
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


    fn: async function ({produto_id}) {
        await Produto.deleteDao(produto_id)

        this.res.redirect('/welcome');
    }

};
