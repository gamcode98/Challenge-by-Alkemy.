const boom = require("@hapi/boom");
const { Movie } = require("../db/models/movie.model");
const { models } = require("./../libs/sequelize");

class CharacterService {
  async create(data) {
    const newCharacter = await models.Character.create(data);
    return newCharacter;
  }

  async find() {
    const rta = await models.Character.findAll({
      attributes: ["image", "name"],
    });
    return rta;
  }

  async findByWeight(objWeight) {
    const rta = await models.Character.findAll({
      where: objWeight,
    });
    return rta;
  }

  async findByMovies(idMovie) {
    const rta = await models.Character.findAll({
      include: [
        {
          model: Movie,
          as: "movies",
          where: { id: idMovie },
        },
      ],
    });
    return rta;
  }

  async findByAges(objAges) {
    const rta = await models.Character.findAll({
      where: objAges,
    });
    return rta;
  }

  async findByName(objName) {
    const rta = await models.Character.findAll({
      where: objName,
    });
    return rta;
  }

  async findOne(id) {
    const character = await models.Character.findByPk(id, {
      include: ["movies"],
    });
    if (!character) {
      throw boom.notFound("character not found");
    }
    return character;
  }

  async update(id, changes) {
    const character = await this.findOne(id);
    const rta = await character.update(changes);
    return rta;
  }
  async delete(id) {
    const character = await this.findOne(id);
    await character.destroy();
    return { id };
  }
}
module.exports = CharacterService;
