const createOneMediaResponseEnum = require("../../api/validators/enums/mediaEnums/createOneMediaResponseEnum");
const createOneMediaValidator = require("../../api/validators/mediaValidators/createOneMediaValidator");

const cloudinary = require("../../api/extensions/cloudinary");
const _entityRepository = require("../../repositories/entity.repository");
const operatorType = require("../../utils/enums/operatorType");
const updateOneMediaResponseEnum = require("../../api/validators/enums/mediaEnums/updateOneMediaResponseEnum");
const updateOneMediaValidator = require("../../api/validators/mediaValidators/updateOneMediaValidator");
const deleteOneMediaResponseEnum = require("../../api/validators/enums/mediaEnums/deleteOneMediaResponseEnum");
const deleteOneMediaValidator = require("../../api/validators/mediaValidators/deleteOneMediaValidator");
const getMediaByLectureResponseEnum = require("../../api/validators/enums/mediaEnums/getMediaByLectureResponseEnum");
const getMediaByLectureValidator = require("../../api/validators/mediaValidators/getMediaByLectureValidator");
const mediaRepository = require("../../repositories/media.repository");
const mediaService = {
  async createOneMedia(request) {
    try {
      const resultValidator = createOneMediaValidator.validate(
        request.body.Lecture_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: createOneMediaResponseEnum.LECTURE_ID_IS_EMPTY };
      }
      const lecture = await _entityRepository("Lectures").getEntity(
        request.body.Lecture_Id
      );
      if (lecture.length == 0) {
        return { Code: createOneMediaResponseEnum.LECTURE_IS_NOT_EXIST };
      }
      const section = await _entityRepository("Sections").getEntity(
        lecture[0].Section_Id
      );
      const course = await _entityRepository("Courses").getEntity(
        section[0].Section_Id
      );
      if (course[0].Author_Id != request.id) {
        return { Code: createOneMediaResponseEnum.IS_NOT_AUTHOR };
      }
      //upload video
      try {
        const video = request.body.Video_URL;
        // console.log(video);
        const videoUpload = await cloudinary.uploader.upload_large(video, {
          resource_type: "video",
          folder: "udemy",
          chunk_size: 100000000,
        });
        console.log("back", videoUpload);
        var newVideo = videoUpload.url;
        var videoDuration = videoUpload.duration;
      } catch (e) {
        console.log(e);
        return { Code: createOneMediaResponseEnum.VIDEO_IS_INVALID };
      }
      let newIsPreview = false;
      if (request.body.Is_Preview) {
        newIsPreview = request.body.Is_Preview;
      }
      const newMedia = {
        Lecture_Id: request.body.Lecture_Id,
        Video_URL: newVideo,
        Duration: videoDuration,
        Is_Preview: newIsPreview,
      };
      const ret = await _entityRepository("Media").addEntity(newMedia);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneMediaResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneMediaResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async updateOneMedia(request) {
    try {
      const resultValidator = updateOneMediaValidator.validate(
        request.body.Lecture_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const media = await _entityRepository("Media").getEntity(
        request.params.id
      );
      if (media.length == 0) {
        return { Code: updateOneMediaResponseEnum.ID_IS_INVALID };
      }
      const lecture = await _entityRepository("Lectures").getEntity(
        request.body.Lecture_Id
      );
      if (lecture.length == 0) {
        return { Code: updateOneMediaResponseEnum.LECTURE_IS_NOT_EXIST };
      }
      const section = await _entityRepository("Sections").getEntity(
        lecture[0].Section_Id
      );
      const course = await _entityRepository("Courses").getEntity(
        section[0].Section_Id
      );
      if (course[0].Author_Id != request.id) {
        return { Code: updateOneMediaResponseEnum.IS_NOT_AUTHOR };
      }
      var newVideo = media[0].Video_URL;
      var newVideoDuration = media[0].Duration;
      if (request.body.Video_URL) {
        try {
          const video = request.body.Video_URL;
          const videoUpload = await cloudinary.uploader.upload_large(video, {
            resource_type: "video",
            upload_preset: "udemy-clone-cloud",
            chunk_size: 100000000,
          });
          newVideo = videoUpload.url;
          newVideoDuration = videoUpload.duration;
        } catch (e) {
          return { Code: updateOneMediaResponseEnum.VIDEO_IS_INVALID };
        }
      }
      media[0].Video_URL = newVideo;
      media[0].Duration = newVideoDuration;
      let newIsPreview = false;
      if (request.body.Is_Preview) {
        newIsPreview = request.body.Is_Preview;
      }
      media[0].Is_Preview = newIsPreview;
      if (
        (await _entityRepository("Media").updateEntity(
          request.params.id,
          media[0]
        )) === operatorType.FAIL.UPDATE
      ) {
        return { Code: updateOneMediaResponseEnum.SERVER_ERROR };
      }
      return { Code: updateOneMediaResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async deleteOneMedia(request) {
    try {
      const resultValidator = deleteOneMediaValidator.validate(
        request.body.Lecture_Id,
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const lecture = await _entityRepository("Lectures").getEntity(
        request.body.Lecture_Id
      );
      if (lecture.length == 0) {
        return { Code: deleteOneMediaResponseEnum.LECTURE_ID_IS_INVALID };
      }
      const section = await _entityRepository("Sections").getEntity(
        lecture[0].Section_Id
      );
      const course = await _entityRepository("Courses").getEntity(
        section[0].Section_Id
      );
      if (course[0].Author_Id != request.id) {
        return { Code: updateOneMediaResponseEnum.IS_NOT_AUTHOR };
      }
      if (
        (await _entityRepository("Media").deleteEntity(request.params.id)) ===
        operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneMediaResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneMediaResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async getMediaByLecture(request) {
    try {
      const resultValidator = getMediaByLectureValidator.validate(
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const lecture = await _entityRepository("Lectures").getEntity(
        request.params.id
      );
      if (lecture.length == 0) {
        return { Code: getMediaByLectureResponseEnum.LECTURE_ID_IS_INVALID };
      }
      const section = await _entityRepository("Sections").getEntity(
        lecture[0].Section_Id
      );
      const course = await _entityRepository("Courses").getEntity(
        section[0].Section_Id
      );
      if (course[0].Author_Id != request.id) {
        return { Code: getMediaByLectureResponseEnum.IS_NOT_AUTHOR };
      }
      const listMediaResponse = await mediaRepository.getMediaByLectureId(
        request.params.id
      );
      return {
        Code: getMediaByLectureResponseEnum.SUCCESS,
        listAllResponse: listMediaResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getMediaByLectureResponseEnum.SERVER_ERROR };
    }
  },
};
module.exports = mediaService;
