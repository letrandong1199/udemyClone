const createOneSectionResponse = require("../../api/validators/enums/sectionEnums/createOneSectionResponse");
const updateOneSectionResponseEnum = require("../../api/validators/enums/sectionEnums/updateOneSectionResponseEnum");

const createOneSectionValidator = require("../../api/validators/sectionValidators/createOneSectionValidator");
const updateOneSectionValidator = require("../../api/validators/sectionValidators/updateOneSectionValidator");

const _entityRepository = require("../../repositories/entity.repository");
const sectionRepository = require("../../repositories/section.repository");
const operatorType = require("../../utils/enums/operatorType");

const sectionService = {
  async createOneSection(request) {
    try {
      console.log("HELLLLLPPPPP", request.id);
      console.log("HELLLLLPPPPP", request.body);
      const resultValidator = createOneSectionValidator.validate(
        request.body.name,
        request.body.course_id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.course_id
      );
      if (course.length == 0) {
        return { Code: createOneSectionResponse.COURSE_ID_IS_INVALID };
      }
      const author = await _entityRepository("Users").getEntity(request.id);
      const roleAuthor = await _entityRepository("Role").getEntity(
        author[0].Role_Id
      );
      if (roleAuthor[0].Name != "Admin") {
        if (course[0].Author_Id != request.id) {
          return { Code: createOneSectionResponse.IS_NOT_AUTHOR };
        }
      }
      const sectionByCourse = await sectionRepository.getSectionByCourseId(
        request.body.course_id
      );
      console.log(request.body.name);
      if (sectionByCourse.length != 0) {
        for (let i = 0; i < sectionByCourse.length; i++)
          if (sectionByCourse[i].Name == request.body.name) {
            return { Code: createOneSectionResponse.SECTION_NAME_IS_EXIST };
          }
      }
      const newSection = {
        Name: request.body.name,
        Course_Id: request.body.course_id,
      };
      if (
        (await _entityRepository("Sections").addEntity(newSection)) ===
        operatorType.FAIL.CREATE
      ) {
        return { Code: createOneSectionResponse.SERVER_ERROR };
      }
      return { Code: createOneSectionResponse.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async updateOneSection(request) {
    try {
      const resultValidator = updateOneSectionValidator.validate(
        request.body.section_id,
        request.body.name,
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: updateOneSectionResponseEnum.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.params.id
      );
      if (course.length == 0) {
        return { Code: updateOneSectionResponse.COURSE_ID_IS_INVALID };
      }
      const author = await _entityRepository("Users").getEntity(request.id);
      const roleAuthor = await _entityRepository("Role").getEntity(
        author[0].Role_Id
      );
      if (roleAuthor[0].Name != "Admin") {
        if (course[0].Author_Id != request.id) {
          return { Code: createOneSectionResponse.IS_NOT_AUTHOR };
        }
      }
      const sectionByCourse = await sectionRepository.getSectionByCourseId(
        request.params.id
      );
      console.log(request.body.name);
      if (sectionByCourse.length != 0) {
        for (let i = 0; i < sectionByCourse.length; i++)
          if (
            sectionByCourse[i].Name == request.body.name &&
            sectionByCourse[i].Id != request.body.section_id
          ) {
            return { Code: createOneSectionResponse.SECTION_NAME_IS_EXIST };
          }
      }
      const newSection = {
        Name: request.body.name,
      };
      if (
        (await _entityRepository("Sections").updateEntity(
          request.body.section_id,
          newSection
        )) === operatorType.FAIL.CREATE
      ) {
        return { Code: createOneSectionResponse.SERVER_ERROR };
      }
      return { Code: createOneSectionResponse.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = sectionService;
