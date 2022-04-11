const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class MovieService {
  async create(data) {
    const newMovie = await models.Movie.create(data);
    return newMovie;
  }

  async addCharacter(data) {
    const newCharacter = await models.MovieCharacter.create(data);
    return newCharacter;
  }

  async find() {
    const rta = await models.Movie.findAll({
      attributes: ["image", "title", "createdAt"],
    });
    return rta;
  }

  async findByName(objName) {
    const rta = await models.Movie.findAll({
      where: objName,
    });
    return rta;
  }

  async findOne(id) {
    const movie = await models.Movie.findByPk(id, {
      include: ["characters"],
    });
    if (!movie) {
      throw boom.notFound("Movie not found");
    }
    return movie;
  }

  async update(id, changes) {
    const movie = await this.findOne(id);
    const rta = await movie.update(changes);
    return rta;
  }

  async delete(id) {
    const movie = await this.findOne(id);
    await movie.destroy(id);
    return { id };
  }
}
module.exports = MovieService;
