const Joi = require("joi");

const id = Joi.number().integer();
const image = Joi.string().uri();
const name = Joi.string().min(3);
const age = Joi.number().integer().positive();
const weight = Joi.number().positive();
const history = Joi.string().min(10);

const createCharacterSchema = Joi.object({
  image: image.required(),
  name: name.required(),
  age: age.required(),
  weight: weight.required(),
  history: history.required(),
});

const updateCharacterSchema = Joi.object({
  image: image,
  name: name,
  age: age,
  weight: weight,
  history: history,
});

const getCharacterSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCharacterSchema,
  updateCharacterSchema,
  getCharacterSchema,
};
