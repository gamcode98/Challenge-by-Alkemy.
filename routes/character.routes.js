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
  const objQuery = req.query;
  if (Object.keys(objQuery).length !== 0) {
    if (objQuery.hasOwnProperty("name")) {
      const charactersByName = await service.findByName(objQuery);
      if (charactersByName.length === 0) {
        res.status(404).json({ message: "Character's name does not exist." });
      } else {
        res.json(charactersByName);
      }
    } else if (objQuery.hasOwnProperty("age")) {
      const charactersByAges = await service.findByAges(objQuery);
      if (charactersByAges.length === 0) {
        res.status(404).json({ message: "Character's age does not exist." });
      } else {
        res.json(charactersByAges);
      }
    } else if (objQuery.hasOwnProperty("weight")) {
      const charactersByWeight = await service.findByWeight(objQuery);
      if (charactersByWeight.length === 0) {
        res.status(404).json({ message: "Character's weight does not exist." });
      } else {
        res.json(charactersByWeight);
      }
    } else if (objQuery.hasOwnProperty("movies")) {
      const idMovie = objQuery["movies"];
      const charactersByMovies = await service.findByMovies(idMovie);
      if (charactersByMovies.length === 0) {
        res
          .status(404)
          .json({ message: "Character's weight does not associate movie/s." });
      } else {
        res.json(charactersByMovies);
      }
    } else {
      res.json({ message: "The query does not exist" });
    }
  } else {
    try {
      const characters = await service.find();
      res.json(characters);
    } catch (error) {
      next(error);
    }
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
