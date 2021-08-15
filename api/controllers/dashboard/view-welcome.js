module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

  },

  fn: async function () {
    if (this.req.session.userId) {
      if (this.req.session.isAdmin) {
        let categorias = await Categoria.find()
        return {
          categorias: categorias
        };
      }
    }
  }
};
