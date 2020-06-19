'use strict';
module.exports = (sequelize, DataTypes) => {
  const redirect_uri = sequelize.define('redirect_uri', {
    uri: DataTypes.STRING
  }, {});
  redirect_uri.associate = function(models) {
    // associations can be defined here
  };
  return redirect_uri;
};