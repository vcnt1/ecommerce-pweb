module.exports = {


    friendlyName: 'Signup',


    description: 'Sign up for a new user account.',


    extendedDescription:
        `This creates a new user record in the database, signs in the requesting user agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,


    inputs: {

        nome: {
            required: true,
            type: 'string',
        },

        email: {
            required: true,
            type: 'string',
            isEmail: true,
        },

        login: {
            required: true,
            type: 'string',
        },

        senha: {
            required: true,
            type: 'string',
        },

        endereco: {
            required: false,
            type: 'string',
        },

    },


    exits: {

        success: {
            description: 'New user account was created successfully.'
        },

        invalid: {
            responseType: 'badRequest',
            description: 'The provided fullName, password and/or email address are invalid.',
            extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
                'parameters should have been validated/coerced _before_ they were sent.'
        },

        emailAlreadyInUse: {
            statusCode: 409,
            description: 'The provided email address or login is already in use.',
        },

    },


    fn: async function ({nome, email, login, senha, endereco}) {
        let hasLogin = await Cliente.findOne({
          login: login
        })

        let hasEmail = await Cliente.findOne({
          email: email
        })

        if(hasEmail || hasLogin) {
          throw 'emailAlreadyInUse'
        }

        if(this.req.session.userId && this.req.session.isAdmin){
          let lastAdministrador = await Administrador.find()
            .sort('id DESC')
            .limit(1)

          let newId = lastAdministrador[0] ? parseInt(lastAdministrador[0].id) + 1 : 1
          newUserRecord = await Administrador.create({
                  id: newId,
                  nome: nome,
                  email: email,
                  login: login,
                  senha: senha,
              }
          ).fetch();
          
        } else {
        let lastCliente = await Cliente.find()
            .sort('id DESC')
            .limit(1)

        let newId = lastCliente[0] ? parseInt(lastCliente[0].id) + 1 : 1
        let newUserRecord = await Cliente.create({
                id: newId,
                nome: nome,
                email: email,
                login: login,
                senha: senha,
                endereco: endereco,
            }
        ).fetch();

        this.req.session.userId = newUserRecord.id;
        this.req.session.login = newUserRecord.login;
       }
        if (sails.hooks.sockets) {
            await sails.helpers.broadcastSessionChange(this.req);
        }

        //
        // if (sails.config.custom.verifyEmailAddresses) {
        //   // Send "confirm account" email
        //   await sails.helpers.sendTemplateEmail.with({
        //     to: newEmailAddress,
        //     subject: 'Please confirm your account',
        //     template: 'email-verify-account',
        //     templateData: {
        //       fullName,
        //       token: newUserRecord.emailProofToken
        //     }
        //   });
        // } else {
        //   sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
        // }
    }

};
