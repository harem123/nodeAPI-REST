'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img_link: DataTypes.STRING,
    created_date: DataTypes.DATEONLY,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movie',
  });
  return movie;
};