const { User, UserSchema } = require("./user.model");
const { Character, CharacterSchema } = require("./character.model");
const { Movie, MovieSchema } = require("./movie.model");
const { Gender, GenderSchema } = require("./gender.model");
const {
  MovieCharacter,
  MovieCharacterSchema,
} = require("./movie-character.model");
const { GenderMovie, GenderMovieSchema } = require("./gender-movie.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Character.init(CharacterSchema, Character.config(sequelize));
  Movie.init(MovieSchema, Movie.config(sequelize));
  Gender.init(GenderSchema, Gender.config(sequelize));
  MovieCharacter.init(MovieCharacterSchema, MovieCharacter.config(sequelize));
  GenderMovie.init(GenderMovieSchema, GenderMovie.config(sequelize));

  Gender.associate(sequelize.models);
  Movie.associate(sequelize.models);
  Character.associate(sequelize.models);
}

module.exports = setupModels;
