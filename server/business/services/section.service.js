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
        request.body.Name,
        request.body.Course_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return { Code: createOneSectionResponseEnum.COURSE_ID_IS_INVALID };
      }
      if (course[0].Author_Id != request.id) {
        return { Code: createOneSectionResponseEnum.IS_NOT_AUTHOR };
      }
      const sectionByCourse = await sectionRepository.getSectionByCourseId(
        request.body.Course_Id
      );
      console.log(request.body.name);
      if (sectionByCourse.length != 0) {
        for (let i = 0; i < sectionByCourse.length; i++)
          if (sectionByCourse[i].Name == request.body.Name) {
            return { Code: createOneSectionResponseEnum.SECTION_NAME_IS_EXIST };
          }
      }
      const newSection = {
        Name: request.body.Name,
        Course_Id: request.body.Course_Id,
      };
      const ret = await _entityRepository("Sections").addEntity(newSection);
      newSection.Id = ret[0];
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneSectionResponseEnum.SERVER_ERROR };
      }
      return {
        Code: createOneSectionResponseEnum.SUCCESS,
        New_Section: newSection,
      };
    } catch (e) {
      console.log(e);
    }
  },
  async updateOneSection(request) {
    try {
      const resultValidator = updateOneSectionValidator.validate(
        request.body.Course_Id,
        request.body.Name,
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: updateOneSectionResponseEnum.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return { Code: updateOneSectionResponseEnum.COURSE_ID_IS_INVALID };
      }
      if (course[0].Author_Id != request.id) {
        return { Code: updateOneSectionResponseEnum.IS_NOT_AUTHOR };
      }
      const sectionByCourse = await sectionRepository.getSectionByCourseId(
        request.body.Course_Id
      );
      console.log(request.body.Name);
      if (sectionByCourse.length != 0) {
        for (let i = 0; i < sectionByCourse.length; i++)
          if (
            sectionByCourse[i].Name == request.body.Name &&
            sectionByCourse[i].Id != request.params.id
          ) {
            return { Code: updateOneSectionResponseEnum.SECTION_NAME_IS_EXIST };
          }
      }
      const newSection = {
        Name: request.body.Name,
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
      );
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const section = await _entityRepository("Sections").getEntity(
        request.params.id
      );
      if (section.length == 0) {
        return { Code: deleteOneSectionResponseEnum.SECTION_ID_IS_NOT_EXIST };
      }
      const course = await _entityRepository("Courses").getEntity(
        section[0].Course_Id
      );
      if (course.length == 0) {
        return { Code: deleteOneSectionResponseEnum.COURSE_ID_IS_NOT_EXIST };
      }
      if (course[0].Author_Id != request.id) {
        return { Code: deleteOneSectionResponseEnum.IS_NOT_AUTHOR };
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
