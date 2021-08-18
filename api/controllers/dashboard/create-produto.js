module.exports = {


    friendlyName: 'View welcome page after create category',


    description: 'Display the welcome page after creating the product',

    inputs: {

        descricaoProd: {
            required: true,
            type: 'string',
        },
        preco: {
            required: true,
            type: 'string',
        },
        fotoBase64: {
            required: true,
            type: 'string',
        },
        quantidade: {
            required: true,
            type: 'string',
        },
        categorias: {
            required: true,
            type: 'ref',
        }

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


    fn: async function ({descricaoProd, fotoBase64, preco, quantidade, categorias}) {
        let hasProduto = await Produto.findOne({
            descricao: descricaoProd
        })

        if (hasProduto) {
            throw 'produtoAlreadyExists'
        }

        let lastProduto = await Produto.find()
            .sort('id DESC')
            .limit(1)

        let newId = lastProduto[0] ? parseInt(lastProduto[0].id) + 1 : 1
        await Produto.createDao({
                id: newId,
                descricao: descricaoProd,
                preco: parseFloat(preco),
                quantidade: parseInt(quantidade),
                foto: fotoBase64,
                categorias: categorias,
            }
        );

    }


};
