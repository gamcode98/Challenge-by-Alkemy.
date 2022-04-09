const Joi = require("joi");

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

module.exports = {
  createGenderSchema,
  updateGenderSchema,
  getGenderSchema,
};
