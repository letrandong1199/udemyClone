const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const categoryRepository = require("./category.repository");
const courseRepository = {
  getCourseByQuery(query, paging, search, sort) {
    console.log(query);
    let filtered = db("Courses");
    filtered = filtered
      .from("Courses")
      .leftJoin("Enrolled_Courses", "Courses.Id", "Enrolled_Courses.Course_Id")
      .select(
        "Id",
        "Title",
        "Sub_Description",
        "Description",
        "Is_Completed",
        "Thumbnail_Small",
        "Thumbnail_Medium",
        "Thumbnail_Large",
        "Price",
        "Courses.Rating",
        "View",
        "Category_Id",
        "Author_Id",
        "Promote_Id",
        "Language_Id",
        "Courses.Updated_At",
        "Courses.Created_At",
        "Is_Blocked"
      )
      .count("User_Id", { as: "NumberOfEnrolled" })
      .groupBy("Id");
    if (search && search.category) {
      filtered = filtered
        .where("Is_Blocked", false)
        .orWhereIn("Category_Id", search.category)
        .andWhere("Is_Completed", true);
    } else {
      filtered = filtered
        .where("Is_Blocked", false)
        .andWhere("Is_Completed", true);
    }
    for (const [key, value] of Object.entries(query)) {
      filtered = filtered.whereIn(key, value);
    }

    if (
      search != undefined &&
      search != null &&
      (search.search || search.category)
    ) {
      console.log("aloaloalolao");
      filtered = filtered.whereRaw(
        `to_tsvector("Title") @@ websearch_to_tsquery(?)`,
        search.search
      );
    }

    if (sort && sort.ColName && sort.Orderby) {
      filtered = filtered.orderBy(sort.ColName, sort.Orderby);
    }
    if (paging && paging.limit != null && paging.offset != null) {
      filtered = filtered.limit(paging.limit).offset(paging.offset);
    }
    console.log(filtered.toSQL().toNative());
    return filtered.catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCountCourses(query, search, sort) {
    let filtered = db("Courses");
    if (search && search.category) {
      filtered = filtered
        .where("Is_Blocked", false)
        .orWhereIn("Category_Id", search.category)
        .andWhere("Is_Completed", true);
    } else {
      filtered = filtered
        .where("Is_Blocked", false)
        .andWhere("Is_Completed", true);
    }
    filtered.where((qb) => {
      for (const [key, value] of Object.entries(query)) {
        qb.whereIn(key, value);
      }
    });
    if (
      search != undefined &&
      search != null &&
      (search.search || search.category)
    ) {
      filtered = filtered.whereRaw(
        `to_tsvector("Title") @@ websearch_to_tsquery(?)`,
        search.search
      );
    }

    if (sort && sort.ColName && sort.OrderBy) {
      filtered = filtered.orderBy(sort.ColName, sort.OrderBy);
    }
    return filtered.count("Id", { as: "Count" }).first();
  },

  getCourseByTitle(title) {
    return db("Courses")
      .where("Title", title)
      .where("Is_Blocked", false)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCourseByCategoryId(category_id) {
    return db("Courses")
      .where("Category_Id", category_id)
      .where("Is_Blocked", false)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCourseByAuthorId(author_id) {
    return db("Courses")
      .where("Author_Id", author_id)
      .catch(() => operatorType.FAIL.READ);
  },
  getCourseMostView() {
    let filtered = db("Courses");
    filtered = filtered.where("Is_Completed", true);
    filtered = filtered.where("Is_Blocked", false);
    filtered.orderBy("View", "desc");
    return filtered.limit(10);
  },
  getCourseMostRecent() {
    let filtered = db("Courses");
    filtered = filtered.where("Is_Completed", true);
    filtered = filtered.where("Is_Blocked", false);
    filtered.orderBy("Updated_At", "desc");
    return filtered.limit(10);
  },
};
module.exports = courseRepository;
