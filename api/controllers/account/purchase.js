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
        this.req.cookies.produtos = [1,2,3]
        if(this.req.cookies && this.req.cookies.produtos ){
            const produtos= this.req.cookies.produtos
            CompraDAO.create({
                clienteId: this.req.session.userId,
                produtos: produtos
            })
            throw {redirect: "/success"}
        }
        else{
            throw "notFound"
        }
    }
  };
  