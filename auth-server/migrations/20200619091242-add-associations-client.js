'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'grants',
      'client_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'clients', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'redirect_uris',
        'client_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'clients', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'grants',
      'client_id',
    ).then(() => {
      return queryInterface.removeColumn(
        'redirect_uris',
        'client_id',
      )
    });
  }
};
