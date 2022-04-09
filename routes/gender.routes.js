const express = require("express");
const GenderService = require("./../services/gender.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  createGenderSchema,
  updateGenderSchema,
  getGenderSchema,
} = require("./../schemas/gender.schema");
const router = express.Router();
const service = new GenderService();

router.get("/", async (req, res, next) => {
  try {
    const genders = await service.find();
    res.json(genders);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(createGenderSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newGender = await service.create(body);
      res.status(201).json(newGender);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getGenderSchema, "params"),
  validatorHandler(updateGenderSchema, "body"),
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
  validatorHandler(getGenderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({ id, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }
);
