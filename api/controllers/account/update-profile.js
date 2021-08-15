module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for the logged-in user.',


  inputs: {

    nome: {
      type: 'string'
    },

    email: {
      type: 'string'
    },

    endereco: {
      type: 'string'
    },

  },


  exits: {

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function ({nome, email, endereco}) {

    // Determine if this request wants to change the current user's email address,
    // revert her pending email address change, modify her pending email address
    // change, or if the email address won't be affected at all.


    // If the email address is changing, make sure it is not already being used.
    if (email) {
      let conflictingCliente = await Cliente.findOne({
        or: [
          { email: email },
        ]
      });
      let conflictingAdministrador = await Administrador.findOne({
        or: [
          { email: email },
        ]
      });

      if(conflictingCliente){
        if (conflictingCliente.id !== this.req.session.userId){
          throw 'emailAlreadyInUse';
        }
      }
      if (conflictingAdministrador){
        if (conflictingAdministrador.id !== this.req.session.userId) {
          throw 'emailAlreadyInUse';
        }
      } 
    }


    // Start building the values to set in the db.
    // (We always set the fullName if provided.)
    var valuesToSet = {
      nome, email, endereco
    };

    // Save to the db
    if(!this.req.session.isAdmin){
      this.me = await Cliente.updateOne({id: this.req.me.id })
      .set(valuesToSet);
    } else {
      this.me = await Administrador.updateOne({id: this.req.me.id })
      .set(valuesToSet);
    }

  }


};
