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
          description: 'Não se tem acesso a homepage caso esteja desligado',       
          responseType: 'redirect'     
      }

    },


    fn: async function () {
      if (this.req.session.userId && !this.req.session.isAdmin) {
        let categorias = await Produto.getByCategorias()
        let produtos = await Produto.find()
        return {
            categorias: categorias,
            produtos: produtos,
        };
      } else {
        throw {redirect: '/welcome'}
      }
    }
};
