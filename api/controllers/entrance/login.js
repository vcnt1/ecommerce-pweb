module.exports = {


    friendlyName: 'Login',


    description: 'Log in using the provided login and password combination.',


    extendedDescription:
        `This action attempts to look up the user record in the database with the
specified login address.  Then, if such a user exists, it uses
bcrypt to compare the hashed password from the database with the provided
password attempt.`,


    inputs: {

        login: {
            type: 'string',
            required: true
        },

        senha: {
            type: 'string',
            required: true
        },

    },


    exits: {

        success: {
            description: 'The requesting user agent has been successfully logged in.',
            extendedDescription:
                `Under the covers, this stores the id of the logged-in user in the session
as the \`userId\` key.  The next time this user agent sends a request, assuming
it includes a cookie (like a web browser), Sails will automatically make this
user id available as req.session.userId in the corresponding action.  (Also note
that, thanks to the included "custom" hook, when a relevant request is received
from a logged-in user, that user's entire record from the database will be fetched
and exposed as \`req.me\`.)`
        },

        badCombo: {
            description: `The provided login and password combination does not
      match any user in the database.`,
            responseType: 'unauthorized'
            // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
            // To customize the generic "unauthorized" response across this entire app, change that file
            // (see api/responses/unauthorized).
            //
            // To customize the response for _only this_ action, replace `responseType` with
            // something else.  For example, you might set `statusCode: 498` and change the
            // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
        }

    },


    fn: async function ({login, senha}) {
        let clienteRecord = await Cliente.findOne({
            login: login,
            senha: senha,
        });

        let administradorRecord = await Administrador.findOne({
          login: login,
          senha: senha,
        });

        let userRecord = !!clienteRecord? clienteRecord : administradorRecord

        if (!userRecord) {
            throw 'badCombo';
        }

        if (this.req.isSocket) {
            sails.log.warn(
                'Received `rememberMe: true` from a virtual request, but it was ignored\n' +
                'because a browser\'s session cookie cannot be reset over sockets.\n' +
                'Please use a traditional HTTP request instead.'
            );
        } else {
            this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
        }

        this.req.session.userId = userRecord.id;
        this.req.session.login = userRecord.login;

        if (sails.hooks.sockets) {
            await sails.helpers.broadcastSessionChange(this.req);
        }

    }

};
