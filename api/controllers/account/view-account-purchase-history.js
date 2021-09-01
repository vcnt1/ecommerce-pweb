module.exports = {


    friendlyName: 'View the purchases history',


    description: 'Display "Purchase history" page.',


    exits: {

        success: {
            viewTemplatePath: 'pages/account/account-purchase-history'
        }

    },


    fn: async function () {
        let compras = await Compra.getByClienteId(this.req.session.userId)

        console.log(compras)
        return {
            compras: compras,
        };

    }


};
