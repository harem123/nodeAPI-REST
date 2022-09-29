'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("character_movies", {
        type: "foreign key",
        fields: ["movieId"],
        name: "fk_movie_table_movieId",
        references: {
          table: "movies",
          field: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      });
      await queryInterface.addConstraint("character_movies", {
        type: "foreign key",
        fields: ["characterId"],
        name: "fk_character_table_characterId",
        references: {
          table: "characters",
          field: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('character_movies');
  }
};