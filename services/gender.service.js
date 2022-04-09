const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
class GenderService {
  async create(data) {
    const newGender = await models.Gender.create(data);
    return newGender;
  }
  async find() {
    const rta = await models.Gender.findAll();
    return rta;
  }
  async findOne(id) {
    const gender = await models.Gender.findByPk(id);
    if (!gender) {
      throw boom.notFound("Gender not found");
    }
    return gender;
  }
  async update(id, changes) {
    const gender = await this.findOne(id);
    const rta = await gender.update(changes);
    return rta;
  }
  async delete(id) {
    const gender = await this.findOne(id);
    await gender.destroy(id);
    return { id };
  }
}
module.exports = GenderService;
