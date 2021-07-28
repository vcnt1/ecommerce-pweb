const ClienteDAO = require("../daos/ClienteDAO");
const CompraDAO = require("../daos/CompraDAO");

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
            responseType: 'redirect',
            description: 'Requesting user is logged in, so redirect to the internal welcome page.',
            viewTemplatePath: 'pages/dashboard/view-welcome',
        },

        admin: {
            description: 'Requesting user is logged in and administrator, so redirect to admin signup.',
            viewTemplatePath: 'pages/entrance/signup',
      },

    },


    fn: async function () {
        if(this.req.session.userId){
          if(this.req.session.isAdmin){
            throw "admin"
          }else{ 
            throw "redirect"
          }
        }
    }
};
