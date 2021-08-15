const ClienteDAO = require("../../daos/ClienteDAO");
module.exports = {


    friendlyName: 'Exclude account',
  
  
    description: 'Exclude logged-in user.',

    exits: { 
        success: {
            statusCode: 200
        },
        notFound: {
            statusCode: 404,
            viewTemplatePath: 'pages/account/account-overview'
        },
        redirect: {
            description: 'Email address confirmed and requesting user logged in.  Since this looks like a browser, redirecting...',       
            responseType: 'redirect'     
        },
    },

  
    fn: async function () {
        if (this.req.wantsJSON) {
            throw { redirect: '/' };       
        }
        if (this.req.session.userId) {
            let user = ClienteDAO.selectById(this.req.session.userId)
            console.log(this.req.session.userId)
            if (user) {
                console.log("olhaeuaqui")
                ClienteDAO.delete(this.req.session.userId)
                delete this.req.session.userId;     
                delete this.req.session.login;     
                delete this.req.session.isAdmin;
                console.log("passouuuaffff")
                throw 'success' 
            } else {
                throw 'notFound'
            }
        }
        throw 'notFound'
      
    }
  
  };
  