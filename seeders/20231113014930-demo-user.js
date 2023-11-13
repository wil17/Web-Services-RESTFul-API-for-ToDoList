'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
       username: "willy",
       password: "wil17"   
      },
      {
        username: "reva",
        password: "reva14"
      },
      {
        username: "user",
        password: "user123"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
    
  }
};
