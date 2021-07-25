const createOneSectionResponseEnum = require("../../api/validators/enums/sectionEnums/createOneSectionResponseEnum");
const deleteOneSectionResponseEnum = require("../../api/validators/enums/sectionEnums/deleteOneSectionResponseEnum");
const getSectionByCourseResponseEnum = require("../../api/validators/enums/sectionEnums/getSectionByCourseResponseEnum");
const updateOneSectionResponseEnum = require("../../api/validators/enums/sectionEnums/updateOneSectionResponseEnum");

const createOneSectionValidator = require("../../api/validators/sectionValidators/createOneSectionValidator");
const deleteOneSectionValidator = require("../../api/validators/sectionValidators/deleteOneSectionValidator");
const getSectionByCourseValidator = require("../../api/validators/sectionValidators/getSectionByCourseValidator");
const updateOneSectionValidator = require("../../api/validators/sectionValidators/updateOneSectionValidator");

const _entityRepository = require("../../repositories/entity.repository");
const sectionRepository = require("../../repositories/section.repository");
const operatorType = require("../../utils/enums/operatorType");

const sectionService = {
  async createOneSection(request) {
    try {
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
        return { Code: createOneSectionResponseEnum.COURSE_ID_IS_INVALID };
      }
      const author = await _entityRepository("Users").getEntity(request.id);
      const roleAuthor = await _entityRepository("Role").getEntity(
        author[0].Role_Id
      );
      if (roleAuthor[0].Name != "Admin") {
        if (course[0].Author_Id != request.id) {
          return { Code: createOneSectionResponseEnum.IS_NOT_AUTHOR };
        }
      }
      const sectionByCourse = await sectionRepository.getSectionByCourseId(
        request.body.course_id
      );
      console.log(request.body.name);
      if (sectionByCourse.length != 0) {
        for (let i = 0; i < sectionByCourse.length; i++)
          if (sectionByCourse[i].Name == request.body.name) {
            return { Code: createOneSectionResponseEnum.SECTION_NAME_IS_EXIST };
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
        return { Code: createOneSectionResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneSectionResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async updateOneSection(request) {
    try {
      const resultValidator = updateOneSectionValidator.validate(
        request.body.course_id,
        request.body.name,
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: updateOneSectionResponseEnum.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.course_id
      );
      if (course.length == 0) {
        return { Code: updateOneSectionResponseEnum.COURSE_ID_IS_INVALID };
      }
      const author = await _entityRepository("Users").getEntity(request.id);
      const roleAuthor = await _entityRepository("Role").getEntity(
        author[0].Role_Id
      );
      if (roleAuthor[0].Name != "Admin") {
        if (course[0].Author_Id != request.id) {
          return { Code: updateOneSectionResponseEnum.IS_NOT_AUTHOR };
        }
      }
      const sectionByCourse = await sectionRepository.getSectionByCourseId(
        request.body.course_id
      );
      console.log(request.body.name);
      if (sectionByCourse.length != 0) {
        for (let i = 0; i < sectionByCourse.length; i++)
          if (
            sectionByCourse[i].Name == request.body.name &&
            sectionByCourse[i].Id != request.params.id
          ) {
            return { Code: updateOneSectionResponseEnum.SECTION_NAME_IS_EXIST };
          }
      }
      const newSection = {
        Name: request.body.name,
      };
      if (
        (await _entityRepository("Sections").updateEntity(
          request.params.id,
          newSection
        )) === operatorType.FAIL.CREATE
      ) {
        return { Code: updateOneSectionResponseEnum.SERVER_ERROR };
      }
      return { Code: updateOneSectionResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async deleteOneSection(request) {
    try {
      const resultValidator = deleteOneSectionValidator.validate(
        request.params.id,
        request.body.course_id
      );
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.course_id
      );
      if (course.length == 0) {
        return { Code: deleteOneSectionResponseEnum.COURSE_ID_IS_NOT_EXIST };
      }
      const author = await _entityRepository("Users").getEntity(request.id);
      const roleAuthor = await _entityRepository("Role").getEntity(
        author[0].Role_Id
      );
      if (roleAuthor[0].Name != "Admin") {
        if (course[0].Author_Id != request.id) {
          return { Code: deleteOneSectionResponseEnum.IS_NOT_AUTHOR };
        }
      }
      const section = await _entityRepository("Sections").getEntity(
        request.params.id
      );
      if (section.length == 0) {
        return { Code: deleteOneSectionResponseEnum.SECTION_ID_IS_NOT_EXIST };
      }
      if (
        (await _entityRepository("Sections").deleteEntity(
          request.params.id
        )) === operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneSectionResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneSectionResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async getSectionByCourse(request) {
    try {
      const resultValidator = getSectionByCourseValidator.validate(
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.params.id
      );
      if (course.length == 0) {
        return { Code: getSectionByCourseResponseEnum.COURSE_ID_IS_EXIST };
      }
      const listSectionResponse = await sectionRepository.getSectionByCourseId(
        request.params.id
      );
      return {
        Code: getSectionByCourseResponseEnum.SUCCESS,
        listAllResponse: listSectionResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getSectionByCourseResponseEnum.SERVER_ERROR };
    }
  },
};
module.exports = sectionService;
