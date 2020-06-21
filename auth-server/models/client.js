'use strict';
module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define('client', {
    clientId: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
      autoIncrement: false,
    },
    clientSecret: DataTypes.STRING
  }, {});
  client.associate = function (models) {
    // associations can be defined here
    client.hasMany(models.grant, { foreignKey: 'client_id' })
    client.hasMany(models.redirect_uri, { foreignKey: 'client_id' })

    client.hasmany = {
      grant: client.hasMany(models.grant, { foreignKey: 'client_id' }),
      redirect_uri: client.hasMany(models.redirect_uri, { foreignKey: 'client_id' })
    }
  };
  return client;
};