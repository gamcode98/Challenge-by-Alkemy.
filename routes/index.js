const express = require("express");
const userRouter = require("./user.routes");
const characterRouter = require("./character.routes");
const movieRouter = require("./movie.routes");
const genderRouter = require("./gender.routes");
const authRouter = require("./auth.routes");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/characters", characterRouter);
  router.use("/movies", movieRouter);
  router.use("/genders", genderRouter);
  router.use("/users", userRouter);
  router.use("/auth", authRouter);
}
module.exports = routerApi;
