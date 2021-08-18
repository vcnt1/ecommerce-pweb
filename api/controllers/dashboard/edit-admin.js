module.exports = {


    friendlyName: 'View welcome page after create category',


    description: 'Display the welcome page after creating the category',

    inputs: {

        admin_id: {
            required: true,
            type: 'string',
        },
        nome: {
            type: 'string',
        },
        login: {
            type: 'string',
        },
        senha: {
            type: 'string',
        },
        email: {
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


    fn: async function ({admin_id, nome, login, senha, email}) {
        await Administrador.updateOne({
            id: parseInt(admin_id)
        }).set({
                nome: nome,
                login: login,
                senha: senha,
                email: email,
            }
        )

        this.res.redirect('/welcome');
    }


};
