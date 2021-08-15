module.exports = {


    friendlyName: 'View welcome page after create category',


    description: 'Display the welcome page after creating the category',

    inputs: {

        descricao: {
            required: true,
            type: 'string',
        }

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


    fn: async function ({descricao}) {
        let hasCategoria = await Categoria.findOne({
            descricao: descricao
        })

        if (hasCategoria) {
            throw 'categoriaAlreadyExists'
        }

        let lastCategoria = await Categoria.find()
            .sort('id DESC')
            .limit(1)

        let newId = lastCategoria[0] ? parseInt(lastCategoria[0].id) + 1 : 1
        let newCategoria = await Categoria.create({
                id: newId,
                descricao: descricao,
            }
        ).fetch();
        console.log(newCategoria)
    }


};
