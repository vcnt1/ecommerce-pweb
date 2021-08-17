module.exports = {

    friendlyName: 'View homepage or redirect',


    description: 'Display or redirect to the appropriate homepage, depending on login status.',


    exits: {

        success: {
            statusCode: 200,
            description: 'Requesting user is a guest, so show the public landing page.',
            viewTemplatePath: 'pages/dashboard/welcome'
        },

    },


    fn: async function () {
        this.res.redirect('/welcome');
    }
};
