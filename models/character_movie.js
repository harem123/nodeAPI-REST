'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class character_movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  character_movie.init({
    characterId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      movieId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
  }, {
    sequelize,
    modelName: 'character_movie',
  });
  return character_movie;
};