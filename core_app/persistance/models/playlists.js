'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlists = sequelize.define('Playlists', {
    userId: DataTypes.UUID,
    name: DataTypes.STRING,
    imageId: DataTypes.UUID
  }, {});
  Playlists.associate = function(models) {
    // associations can be defined here
  };
  return Playlists;
};