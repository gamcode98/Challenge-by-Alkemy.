const Joi = require("joi");

const movieId = Joi.number().integer();
const genderId = Joi.number().integer();
const id = Joi.number().integer();
const image = Joi.string().uri();
const name = Joi.string().min(3);

const createGenderSchema = Joi.object({
  image: image.required(),
  name: name.required(),
});

const updateGenderSchema = Joi.object({
  image: image,
  name: name,
});

const getGenderSchema = Joi.object({
  id: id.required(),
});

const addMovieSchema = Joi.object({
  movieId: movieId.required(),
  genderId: genderId.required(),
});

module.exports = {
  createGenderSchema,
  updateGenderSchema,
  getGenderSchema,
  addMovieSchema,
};
