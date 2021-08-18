module.exports = {


    friendlyName: 'View welcome page after create category',


    description: 'Display the welcome page after creating the category',

    inputs: {

        produto_id: {
            required: true,
            type: 'string',
        },
        descricao: {
            type: 'string',
        },
        preco: {
            type: 'string',
        },
        fotoBase64: {
            type: 'string',
        },
        quantidade: {
            type: 'string',
        },
        categorias: {
            type: 'ref',
        }

    },
    exits: {

        success: {
            viewTemplatePath: 'pages/dashboard/welcome',
            description: 'Display the welcome page after creating the category'
        },

    },


    fn: async function({produto_id, descricao, fotoBase64, preco, quantidade, categorias}) {
        await Produto.updateDao({
                id: produto_id,
                descricao: descricao,
                preco: parseFloat(preco),
                quantidade: parseInt(quantidade),
                foto: fotoBase64,
            }, categorias
        );

        this.res.redirect('/welcome');
    }


};
