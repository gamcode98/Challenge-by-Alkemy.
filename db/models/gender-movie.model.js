const { Model, DataTypes } = require("sequelize");

const { MOVIE_TABLE } = require("./movie.model");
const { GENDER_TABLE } = require("./gender.model");

const GENDER_MOVIE_TABLE = "genders_movies";

const GenderMovieSchema = {
  id: {
    // allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  movieId: {
    field: "movie_id",
    // allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: MOVIE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  genderId: {
    field: "gender_id",
    // allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: GENDER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class GenderMovie extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENDER_MOVIE_TABLE,
      modelName: "GenderMovie",
      timestamps: false,
    };
  }
}
module.exports = {
  GenderMovieSchema,
  GenderMovie,
  GENDER_MOVIE_TABLE,
};
