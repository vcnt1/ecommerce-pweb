module.exports = {


    friendlyName: 'View welcome page',


    description: 'Display the dashboard "Welcome" page.',


    exits: {

        success: {
            viewTemplatePath: 'pages/dashboard/welcome',
            description: 'Display the welcome page for authenticated users.'
        },

        redirect: {
          viewTemplatePath: 'pages/homepage',
          description: 'Display the shop.'
      },

    },

    fn: async function () {
        if (this.req.session.userId) {
            if (!this.req.session.isAdmin) {
              throw {redirect: '/'}
            } else {
              console.log('admin2')
              let produtosFormatted = []
              let categorias = await Categoria.find().sort('id ASC');
              let produtos = await Produto.find().sort('id ASC');

              for (let p of produtos) {
                  p.categorias = await Produto.getCategorias(p.id)
                  produtosFormatted.push(p)
              }

              return {
                  categorias: categorias,
                  produtos: produtosFormatted,
              };
            }
        }
    }
};
