const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const mediaRepository = {
  getMediaByLectureId(lecture_id) {
    return db("Media")
      .where("Lecture_Id", lecture_id)
      .catch(() => operatorType.FAIL.READ);
  },
};
module.exports = mediaRepository;
