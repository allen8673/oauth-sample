'use strict';
module.exports = (sequelize, DataTypes) => {
  const authorizationCode = sequelize.define('authorizationCode', {
    authorizationCode: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
    redirectUri: DataTypes.STRING
  }, {});
  authorizationCode.associate = function(models) {
    // associations can be defined here
    authorizationCode.hasOne(models.client)
    authorizationCode.hasOne(models.user)
  };
  return authorizationCode;
};