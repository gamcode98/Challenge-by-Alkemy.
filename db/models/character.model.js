const { Model, DataTypes, Sequelize } = require("sequelize");

const CHARACTER_TABLE = "characters";
const CharacterSchema = {
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
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  age: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  weight: {
    allowNull: false,
    type: DataTypes.DOUBLE,
  },
  history: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Character extends Model {
  static associate(models) {
    this.belongsToMany(models.Movie, {
      as: "movies",
      through: models.MovieCharacter,
      foreignKey: "characterId",
      otherKey: "movieId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CHARACTER_TABLE,
      modelName: "Character",
      timestamps: false,
    };
  }
}
module.exports = { CHARACTER_TABLE, CharacterSchema, Character };
