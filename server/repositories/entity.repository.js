const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
module.exports = (nameEntity) => {
  return {
    //CREATE
    addEntity(entity) {
      // console.log(entity);
      return db(nameEntity)
        .insert(entity)
        .catch(() => operatorType.FAIL.CREATE);
    },
    //READ
    getEntities() {
      return db(nameEntity).catch(() => operatorType.FAIL.READ);
    },
    //READ BY ID
    getEntity(id) {
      return db(nameEntity)
        .where("Id", id)
        .catch(() => operatorType.FAIL.READ);
    },
    //DELETE
    deleteEntity(id) {
      return db(nameEntity)
        .where("Id", id)
        .del()
        .catch(() => operatorType.FAIL.DELETE);
    },
  };
};
