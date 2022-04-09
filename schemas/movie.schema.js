const Joi = require("joi");

const id = Joi.number().integer();
const movieId = Joi.number().integer();
const characterId = Joi.number().integer();
const image = Joi.string().uri();
const title = Joi.string().min(3);
const score = Joi.number().min(1).max(5).integer();

const createMovieSchema = Joi.object({
  image: image.required(),
  title: title.required(),
  score: score.required(),
});

const updateMovieSchema = Joi.object({
  image: image,
  title: title,
  score: score,
});

const getMovieSchema = Joi.object({
  id: id.required(),
});

const addCharacterSchema = Joi.object({
  movieId: movieId.required(),
  characterId: characterId.required(),
});

module.exports = {
  createMovieSchema,
  updateMovieSchema,
  getMovieSchema,
  addCharacterSchema,
};
