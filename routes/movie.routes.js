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
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const objQuery = req.query;
    if (Object.keys(objQuery).length !== 0) {
      if (objQuery.hasOwnProperty("name")) {
        let objMovie = { title: `${objQuery["name"]}` };
        const movieByName = await service.findByName(objMovie);
        if (movieByName.length === 0) {
          res.status(404).json({ message: "Movie's name does not exist." });
        } else {
          res.json(movieByName);
        }
      } else if (objQuery.hasOwnProperty("genre")) {
        const idGender = objQuery["genre"];
        try {
          const movieByGender = await service.findByGender(idGender);
          res.json(movieByGender);
        } catch (error) {
          next(error);
        }
      } else if (objQuery.hasOwnProperty("order")) {
        const order = objQuery["order"].toUpperCase();
        if (order === "ASC" || order === "DESC") {
          const moviesByOrder = await service.findByOrder(order);
          res.json(moviesByOrder);
        } else {
          res.status(404).json({ message: "Movie order does not exist." });
        }
      } else {
        res.json({ message: "The query does not exist." });
      }
    } else {
      try {
        const movies = await service.find();
        res.json(movies);
      } catch (error) {
        next(error);
      }
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
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
