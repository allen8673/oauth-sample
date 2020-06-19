'use strict';
module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define('client', {
    clientId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },
    clientSecret: DataTypes.STRING
  }, {});
  client.associate = function (models) {
    // associations can be defined here
    client.hasMany(models.grant)
    client.hasMany(models.redirect_uri)
  };
  return client;
};