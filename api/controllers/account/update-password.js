const ClienteDAO = require("../../daos/ClienteDAO");

module.exports = {


  friendlyName: 'Update password',


  description: 'Update the password for the logged-in user.',


  inputs: {

    password: {
      description: 'The new, unencrypted password.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function ({password}) {
    // Update the record for the logged-in user.
    await ClienteDAO.update(this.req.session.userId, { senha: password })
  }


};
