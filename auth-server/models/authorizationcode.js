'use strict';
module.exports = (sequelize, DataTypes) => {
  const authorizationCode = sequelize.define('authorizationCode', {
    authorizationCode: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
    redirectUri: DataTypes.STRING
  }, {});
  authorizationCode.associate = function(models) {
    // associations can be defined here
    authorizationCode.belongsTo(models.client, {foreignKey: 'client_id'})
    authorizationCode.belongsTo(models.user, {foreignKey: 'user_id'})
  };
  return authorizationCode;
};