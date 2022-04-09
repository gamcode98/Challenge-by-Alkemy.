const { Model, DataTypes } = require("sequelize");

const { MOVIE_TABLE } = require("./movie.model");
const { CHARACTER_TABLE } = require("./character.model");

const MOVIE_CHARACTER_TABLE = "movies_characters";

const MovieCharacterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  characterId: {
    field: "character_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: CHARACTER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  movieId: {
    field: "movie_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: MOVIE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class MovieCharacter extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_CHARACTER_TABLE,
      modelName: "MovieCharacter",
      timestamps: false,
    };
  }
}
module.exports = {
  MovieCharacterSchema,
  MovieCharacter,
  MOVIE_CHARACTER_TABLE,
};
