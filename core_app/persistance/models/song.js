'use strict'
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    album: DataTypes.STRING,
    fileName: DataTypes.STRING,
    playlistId: DataTypes.INTEGER
  }, {})
  Song.associate = function(models) {
    Song.belongsToMany(models.Playlist, {through: 'SongPlaylist'})
  }
  return Song
}
