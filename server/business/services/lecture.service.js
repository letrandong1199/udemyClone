const createOneLectureResponseEnum = require("../../api/validators/enums/lectureEnums/createOneLectureResponseEnum");
const deleteOneLectureResponseEnum = require("../../api/validators/enums/lectureEnums/deleteOneLectureResponseEnum");
const getLectureBySectionResponseEnum = require("../../api/validators/enums/lectureEnums/getLectureBySectionResponseEnum");
const updateOneLectureResponseEnum = require("../../api/validators/enums/lectureEnums/updateOneLectureResponseEnum");

const createOneLectureValidator = require("../../api/validators/lectureValidators/createOneLectureValidator");
const deleteOneLectureValidator = require("../../api/validators/lectureValidators/deleteOneLectureValidator");
const getLectureBySectionValidator = require("../../api/validators/lectureValidators/getLectureBySectionValidator");
const updateOneLectureValidator = require("../../api/validators/lectureValidators/updateOneLectureValidator");

const _entityRepository = require("../../repositories/entity.repository");
const lectureRepository = require("../../repositories/lecture.repository");
const operatorType = require("../../utils/enums/operatorType");

const lectureService = {
  async createOneLecture(request) {
    try {
      const resultValidator = createOneLectureValidator.validate(
        request.body.Title,
        request.body.Section_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      if (request.body.Description === undefined) {
        request.body.Description = "";
      }
      const section = await _entityRepository("Sections").getEntity(
        request.body.Section_Id
      );
      if (section.length == 0) {
        return { Code: createOneLectureResponseEnum.SECTION_ID_IS_INVALID };
      }
      const course = await _entityRepository("Courses").getEntity(
        section[0].Course_Id
      );
      if (course[0].Author_Id != request.id) {
        return { Code: createOneLectureResponseEnum.IS_NOT_AUTHOR };
      }
      const lectureBySection = await lectureRepository.getLectureBySectionId(
        request.body.Section_Id
      );
      console.log(request.body.Title);
      if (lectureBySection.length != 0) {
        for (let i = 0; i < lectureBySection.length; i++)
          if (lectureBySection[i].Title == request.body.Title) {
            return {
              Code: createOneLectureResponseEnum.LECTURE_TITLE_IS_EXIST,
            };
          }
      }
      const newLecture = {
        Title: request.body.Title,
        Description: request.body.Description,
        Section_Id: request.body.Section_Id,
      };
      const ret = await _entityRepository("Lectures").addEntity(newLecture);
      newLecture["Id"] = ret[0];
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneLectureResponseEnum.SERVER_ERROR };
      }
      return {
        Code: createOneLectureResponseEnum.SUCCESS,
        New_Lecture: newLecture,
      };
    } catch (e) {
      console.log(e);
    }
  },
  async updateOneLecture(request) {
    try {
      const resultValidator = updateOneLectureValidator.validate(
        request.body.Section_Id,
        request.body.Title,
        request.body.Description,
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }

      const section = await _entityRepository("Sections").getEntity(
        request.body.Section_Id
      );
      if (section.length == 0) {
        return { Code: updateOneLectureResponseEnum.SECTION_ID_IS_INVALID };
      }
      const course = await _entityRepository("Courses").getEntity(
        section[0].Course_Id
      );
      if (course[0].Author_Id != request.id) {
        return { Code: updateOneLectureResponseEnum.IS_NOT_AUTHOR };
      }
      const lectureBySection = await lectureRepository.getLectureBySectionId(
        request.body.Section_Id
      );

      if (lectureBySection.length != 0) {
        for (let i = 0; i < lectureBySection.length; i++)
          if (lectureBySection[i].Title == request.body.Title &&
            lectureBySection[i].Id != request.params.id
          ) {
            return {
              Code: updateOneLectureResponseEnum.LECTURE_TITLE_IS_EXIST,
            };
          }
      }


      const updateContent = request.body;

      if (
        (await _entityRepository("Lectures").updateEntity(
          request.params.id,
          updateContent
        )) === operatorType.FAIL.CREATE
      ) {
        return { Code: updateOneLectureResponseEnum.SERVER_ERROR };
      }
      return { Code: updateOneLectureResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async deleteOneLecture(request) {
    try {
      const resultValidator = deleteOneLectureValidator.validate(
        request.params.id,
      );
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }

      const lecture = await _entityRepository("Lectures").getEntity(
        request.params.id
      );
      if (lecture.length == 0) {
        return { Code: deleteOneLectureResponseEnum.LECTURE_ID_IS_NOT_EXIST };
      }

      const section = await _entityRepository("Sections").getEntity(
        lecture[0].Section_Id
      );
      console.log(section.length);
      if (section.length == 0) {
        return { Code: deleteOneLectureResponseEnum.SECTION_ID_IS_INVALID };
      }
      const course = await _entityRepository("Courses").getEntity(
        section[0].Course_Id
      );
      if (course[0].Author_Id != request.id) {
        return { Code: deleteOneLectureResponseEnum.IS_NOT_AUTHOR };
      }


      if (
        (await _entityRepository("Lectures").deleteEntity(
          request.params.id
        )) === operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneLectureResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneLectureResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async getLectureBySection(request) {
    try {
      const resultValidator = getLectureBySectionValidator.validate(
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const section = await _entityRepository("Sections").getEntity(
        request.params.id
      );
      if (section.length == 0) {
        return { Code: getLectureBySectionResponseEnum.SECTION_ID_IS_INVALID };
      }
      const listLectureResponse = await lectureRepository.getLectureBySectionId(
        request.params.id
      );
      return {
        Code: getLectureBySectionResponseEnum.SUCCESS,
        listAllResponse: listLectureResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getLectureBySectionResponseEnum.SERVER_ERROR };
    }
  },
};
module.exports = lectureService;
