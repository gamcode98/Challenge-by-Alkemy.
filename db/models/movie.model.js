const { Model, DataTypes, Sequelize } = require("sequelize");
const MOVIE_TABLE = "movies";

const MovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
  score: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

class Movie extends Model {
  static associate(models) {
    this.belongsToMany(models.Character, {
      as: "characters",
      through: models.MovieCharacter,
      foreignKey: "movieId",
      otherKey: "characterId",
    });
    this.belongsToMany(models.Gender, {
      as: "genders",
      through: models.GenderMovie,
      foreignKey: "movieId",
      otherKey: "genderId",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: "Movie", //Mismo nombre que la clase
      timestamps: false,
    };
  }
}

module.exports = { MOVIE_TABLE, MovieSchema, Movie };
