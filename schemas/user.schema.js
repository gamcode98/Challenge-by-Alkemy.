const Joi = require("joi");

const id = Joi.number().integer();
const username = Joi.string().min(3);
const email = Joi.string().min(3);
const password = Joi.string().min(3);

const createUserSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  username: username,
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
