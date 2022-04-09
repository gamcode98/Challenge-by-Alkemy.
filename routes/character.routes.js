const express = require("express");

const CharacterService = require("./../services/character.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  createCharacterSchema,
  updateCharacterSchema,
  getCharacterSchema,
} = require("../schemas/character.schema");

const router = express.Router();
const service = new CharacterService();

router.get("/", async (req, res, next) => {
  try {
    const characters = await service.find();
    res.json(characters);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getCharacterSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await service.findOne(id);
      res.json(character);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createCharacterSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCharacter = await service.create(body);
      res.status(201).json(newCharacter);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getCharacterSchema, "params"),
  validatorHandler(updateCharacterSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      await service.update(id, body);
      res.json({ id, message: "updated" });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getCharacterSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(202).json({ id, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
