'use strict';
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    accessToken: DataTypes.STRING,
    accessTokenExpiresAt: DataTypes.DATE
  }, {});
  token.associate = function(models) {
    // associations can be defined here
    token.hasOne(models.client)
    token.hasOne(models.user)
  };
  return token;
};