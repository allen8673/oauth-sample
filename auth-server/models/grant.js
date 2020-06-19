'use strict';
module.exports = (sequelize, DataTypes) => {
  const grant = sequelize.define('grant', {
    grant: DataTypes.STRING
  }, {});
  grant.associate = function(models) {
    // associations can be defined here
  };
  return grant;
};