const CompraDAO = require("../../daos/CompraDAO");

module.exports = {


    friendlyName: 'Exclude account',
  
  
    description: 'Exclude logged-in user.',

    exits: { 
        notFound: {
            statusCode: 404,
            viewTemplatePath: 'pages/entrance/basket'
        },
        success: {
            statusCode: 200,
            viewTemplatePath: 'pages/entrance/success'
        },
        redirect: {
            description: 'Email address confirmed and requesting user logged in.  Since this looks like a browser, redirecting...',       
            responseType: 'redirect'     
        }
    },

  
    fn: async function () {
      if(this.req.headers.cookie){
        this.req.headers.cookie.split(";").map(cookie => {
          if(cookie.endsWith("]")){
            arrProdutos = JSON.parse(cookie)
            CompraDAO.create({
              clienteId: this.req.session.userId,
              produtos: arrProdutos
            })

            throw {redirect: "/success"}
          }
        })
        throw "notFound"
      }else{
        throw "notFound"
      }
    }
  };
  