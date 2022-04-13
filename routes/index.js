const express = require("express");
const characterRouter = require("./character.routes");
const movieRouter = require("./movie.routes");
const genderRouter = require("./gender.routes");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/characters", characterRouter);
  router.use("/movies", movieRouter);
  router.use("/genders", genderRouter);
}
module.exports = routerApi;
