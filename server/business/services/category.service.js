const createOneCategoryResponseEnum = require("../../api/validators/enums/categoryEnums/createOneCategoryResponseEnum");
const deleteOneCategoryResponseEnum = require("../../api/validators/enums/categoryEnums/deleteOneCategoryResponseEnum");
const getAllCategoryResponseEnum = require("../../api/validators/enums/categoryEnums/getAllCategoryResponseEnum");
const updateOneCategoryResponseEnum = require("../../api/validators/enums/categoryEnums/updateOneCategoryResponseEnum");

const operatorType = require("../../utils/enums/operatorType");

const createOneCategoryValidator = require("../../api/validators/categoryValidators/createOneCategoryValidator");
const deleteOneCategoryValidator = require("../../api/validators/categoryValidators/deleteOneCategoryValidator");
const updateOneCategoryValidator = require("../../api/validators/categoryValidators/updateOneCategoryValidator");

const categoryRepository = require("../../repositories/category.repository");
const _entityRepository = require("../../repositories/entity.repository");
const categoryService = {
  //Update one category
  async updateOneCategory(request) {
    try {
      const resultValidator = updateOneCategoryValidator.validate(
        request.params.id,
        request.body.Name
      );
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const category = await _entityRepository("Categories").getEntity(
        request.params.id
      );
      console.log(category);
      if (category.length == 0) {
        return { Code: updateOneCategoryResponseEnum.ID_IS_INVALID };
      }
      const ret = await categoryRepository.getCategoryByName(request.body.Name);

      if (ret.length != 0) {
        return { Code: updateOneCategoryResponseEnum.CATEGORY_NAME_IS_EXIST };
      }

      if (!request.Parent_Id) {
        const categoryParent = await _entityRepository("Categories").getEntity(request.Parent_Id)
        if (category.length == 0) {
          return { Code: createOneCategoryResponseEnum.PARENT_IS_NOT_EXIST };
        }
      }

      category[0].Name = request.body.Name;
      category[0].Parent_Id = request.body.Parent_Id;
      if (
        (await _entityRepository("Categories").updateEntity(
          request.params.id,
          category[0]
        )) === operatorType.FAIL.UPDATE
      ) {
        return { Code: updateOneCategoryResponseEnum.SERVER_ERROR };
      }
      return {
        Code: updateOneCategoryResponseEnum.SUCCESS,
        newCategory: category[0],
      };
    } catch (e) {
      console.log(e);
    }
  },

  //Get all User
  async getAllCategory() {
    try {
      const listCategory = await _entityRepository("Categories").getEntities();
      let listCategoryResponse = listCategory.map((category) => {
        return {
          Id: category.Id,
          Name: category.Name,
        };
      });
      return {
        Code: getAllCategoryResponseEnum.SUCCESS,
        listAllResponse: listCategoryResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllCategoryResponseEnum.SERVER_ERROR };
    }
  },
  //Delete one user
  async deleteOneCategory(request) {
    try {
      const resultValidator = deleteOneCategoryValidator.validate(
        request.params.id
      );
      console.log(request.params.id);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const category = await _entityRepository("Category").getEntity(
        request.params.id
      );
      console.log("Category:", category);
      if (category.length == 0) {
        return { Code: deleteOneCategoryResponseEnum.CATEGORY_IS_NOT_EXIST };
      }
      if (
        (await _entityRepository("Categories").deleteEntity(
          request.params.id
        )) === operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneCategoryResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneCategoryResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  //Create one user
  async createOneCategory(request) {
    try {
      const resultValidator = createOneCategoryValidator.validate(request.name);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const category = await categoryRepository.getCategoryByName(request.name);
      if (category.length != 0) {
        return { Code: createOneCategoryResponseEnum.CATEGORY_IS_EXIST };
      }

      if (!request.Parent_Id) {
        const categoryParent = await _entityRepository("Categories").getEntity(request.Parent_Id)
        if (category.length == 0) {
          return { Code: createOneCategoryResponseEnum.PARENT_IS_NOT_EXIST };
        }
      }
      const newCategory = {
        Name: request.Name,
        Parent_Id: request.Parent_Id,
      };
      ret = await _entityRepository("Categories").addEntity(newCategory);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneCategoryResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneCategoryResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = categoryService;
