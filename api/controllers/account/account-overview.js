module.exports = {


  friendlyName: 'Delete Account',


  description: 'Delete account of the logged-in user.',

  exits: {

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function () {

    console.log('testeeee')

  }


};
