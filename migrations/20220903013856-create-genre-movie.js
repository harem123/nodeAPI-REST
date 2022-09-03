'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genre_movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieId: {
        type: Sequelize.INTEGER,
        references: { model: 'movies', key: 'id' }
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: { model: 'genres', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('genre_movies');
  }
};