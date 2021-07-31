const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const wishlistRepository = {
  getWishlistByUserId(user_id) {
    return db("Wishlists")
      .where("User_Id", user_id)
      .catch(() => operatorType.FAIL.READ);
  },
  getWishlistByUser(user_id) {
    console.log(user_id);
    return db("Wishlists")
      .where("User_Id", user_id)
      .join("Courses", `Courses.Id`, `Wishlists.Course_Id`)
      .catch((e) => { console.log(e); return operatorType.FAIL.READ });
  },
};
module.exports = wishlistRepository;
