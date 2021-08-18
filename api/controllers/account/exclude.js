const ClienteDAO = require("../../daos/ClienteDAO");
const AdministradorDAO = require("../../daos/ClienteDAO");
module.exports = {


    friendlyName: 'Exclude account',
  
  
    description: 'Exclude logged-in user.',

    exits: { 
        notFound: {
            statusCode: 404,
            viewTemplatePath: 'pages/account/account-overview'
        },
        redirect: {
            description: 'Email address confirmed and requesting user logged in.  Since this looks like a browser, redirecting...',       
            responseType: 'redirect'     
        }
    },

  
    fn: async function () {
        if (this.req.wantsJSON) {
            throw { redirect: '/' };       
        }
        if (this.req.session.userId) {
            if(this.req.session.isAdmin) {
              let user = AdministradorDAO.selectById(this.req.session.userId)
              if (user) {
                  AdministradorDAO.delete(this.req.session.userId)
                  
                  throw {redirect: '/logout'}
              } else {
                  throw 'notFound'
              }
              
            } else {
              let user = ClienteDAO.selectById(this.req.session.userId)
              if (user) {
                  ClienteDAO.delete(this.req.session.userId)
                  throw {redirect: '/logout'}
              } else {
                  throw 'notFound'
              }
            }
        }
        throw 'notFound'
      
    }
  
  };
  