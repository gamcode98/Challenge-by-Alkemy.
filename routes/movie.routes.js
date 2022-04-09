const express = require("express");
const MovieService = require("../services/movie.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createMovieSchema,
  updateMovieSchema,
  getMovieSchema,
  addCharacterSchema,
} = require("../schemas/movie.schema");
const router = express.Router();
const service = new MovieService();

router.get("/", async (req, res, next) => {
  try {
    const movies = await service.find();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getMovieSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await service.findOne(id);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createMovieSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newMovie = await service.create(body);
      res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add-character",
  validatorHandler(addCharacterSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCharacter = await service.addCharacter(body);
      res.status(201).json(newCharacter);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getMovieSchema, "params"),
  validatorHandler(updateMovieSchema, "body"),
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
  validatorHandler(getMovieSchema, "params"),
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
