module.exports = {


    friendlyName: 'View welcome page after create category',


    description: 'Display the welcome page after creating the category',

    inputs: {

        categoria_id: {
            required: true,
            type: 'string',
        },
        descricao: {
            required: true,
            type: 'string',
        },

    },
    exits: {

        success: {
            viewTemplatePath: 'pages/dashboard/welcome',
            description: 'Display the welcome page after creating the category'
        },

        categoriaAlreadyExists: {
            statusCode: 409,
            description: 'The provided description already exists',
        },

    },


    fn: async function ({categoria_id, descricao}) {
        await Categoria.updateOne({
            id: parseInt(categoria_id)
        }).set({
                descricao: descricao,
            }
        )

        this.res.redirect('/welcome');
    }


};
