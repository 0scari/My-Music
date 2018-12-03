'use strict'
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    imageData: DataTypes.BLOB('long')
  }, {})
  return Playlist
}
