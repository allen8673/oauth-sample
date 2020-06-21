'use strict';


module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    accessToken: DataTypes.STRING,
    accessTokenExpiresAt: DataTypes.DATE
  }, {});
  token.associate = function (models) {
    // associations can be defined here
    token.belongsTo(models.client, { foreignKey: 'client_id' })
    token.belongsTo(models.user, { foreignKey: 'user_id' })

    token.belongs = {
      client: token.belongsTo(models.client, { foreignKey: 'client_id' }),
      user: token.belongsTo(models.user, { foreignKey: 'user_id' })
    }
  };

  return token;
};