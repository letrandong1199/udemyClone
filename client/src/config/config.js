export const config = {
    "HOST": "http://localhost:8080/api", //"https://udemy-apis.herokuapp.com/api",
    "PORT": "8000",
    "USER_CONTROLLER": "user-controller",
    "COURSE_CONTROLLER": "course-controller",
    "CATEGORY_CONTROLLER": "category-controller",
    "ENROLLED_CONTROLLER": "enrolled-course-controller",
    "LANGUAGE_CONTROLLER": "language-controller",
    "MEDIA_CONTROLLER": "media-controller",
    "SECTION_CONTROLLER": "section-controller",
    "LECTURE_CONTROLLER": "lecture-controller",
    "PROMOTE_CONTROLLER": "promote-controller",
    "WISHLIST_CONTROLLER": "wishlist-controller",
    "FEEDBACK_CONTROLLER": "feedback-controller",
};

export const ROUTES = {
    home: "/",
    courseDetail: "/course/detail",
    profile: "/profile",
    myLearning: "/my-learning",
    wishlist: "/wishlist",
    createCourse: "/course/create",
    editCourse: "/course/edit",
    admin: "/admin",
    instructor: "/instructor",
    search: "/search",
    course: "/course",
    learn: "/learn",
}

export const GET_PARAMS = {
    popup: "auth",
};

export const GET_ENUMS = {
    popup: {
        signIn: "sign-in",
        signUp: "sign-up",
    },
};

export const CREATE_USER = {
    SUCCESS: "signup_success",
    NAME_ISEMPTY: "name_is_empty",
    EMAIL_IS_EMPTY: "email_is_empty",
    PASSWORD_IS_EMPTY: "password_is_empty",
    ROLE_OFUSER_IS_EMPTY: "role_of_user_is_empty",
    ROLE_OFUSER_IS_INVALID: "role_of_user_is_invalid",
    EMAIL_IS_EXIST: "email_is_exist",
    SERVER_ERROR: "server_error",
    PASSWORD_IS_LESS_THAN_6_LETTERS: "password_is_less_than_6_letters",
}

export const SIGN_IN = {
    SUCCESS: "signin_success",
    EMAIL_IS_EMPTY: "username_is_empty",
    PASSWORD_IS_EMPTY: "password_is_empty",
    WRONG_EMAIL: "wrong_email",
    WRONG_PASSWORD: "wrong_password",
    SERVER_ERROR: "server_error",
}

export const DELETE_CATEGORY = {
    SUCCESS: "delete_category_success",
    SERVER_ERROR: "server_error",
    CATEGORY_IS_NOT_EXIST: "category_is_not_exist",
    ID_IS_EMPTY: "id_is_empty",
}

export const UPDATE_CATEGORY = {
    SUCCESS: "update_category_succsess",
    SERVER_ERROR: "server_error",
    CATEGORY_IS_NOT_EXIST: "category_is_not_exist",
    ID_IS_INVALID: "id_is_invalid",
    ID_IS_EMPTY: "id_is_empty",
    CATEGORY_NAME_IS_EMPTY: "category_name_is_empty",
    CATEGORY_NAME_IS_EXIST: "category_name_is_exist",
};

export const CREATE_CATEGORY = {
    SUCCESS: "add_category_success",
    CATEGORY_NAME_IS_EMPTY: "category_name_is_empty",
    CATEGORY_IS_EXIST: "category_is_exist",
    SERVER_ERROR: "server_error",
    PARENT_IS_NOT_EXIST: "parent_is_not_exist",
};

export const GET_ALL_CATEGORIES = {
    SUCCESS: "get_all_category_success",
    SERVER_ERROR: "server_error",
};

export const GET_ALL_LANGUAGES = {
    SUCCESS: "get_all_language_success",
    SERVER_ERROR: "server_error",
};


export const UPDATE_USER = {
    SUCCESS: "update_user_succsess",
    SERVER_ERROR: "server_error",
    USER_IS_NOT_EXIST: "user_is_not_exist",
    ID_IS_INVALID: "id_is_invalid",
    ID_EMPTY: "id_empty",
    NAME_IS_EMPTY: "name_is_empty",
    NAME_IS_INVALID: "name_is_invalid",
    PASSWORD_IS_EMPTY: "password_is_empty",
    PASSWORD_IS_LESS_THAN_6_LETTERS: "password_is_less_than_6_letters",
};

export const DELETE_USER = {
    SUCCESS: "delete_success",
    SERVER_ERROR: "server_error",
    ID_IS_NOT_EXIST: "id_is_not_exist",
    ID_IS_EMPTY: "id_is_empty",
};

export const ENROLLED = {
    SUCCESS: "add_enrolled_course_success",
    USER_ID_IS_EMPTY: "user_id_is_empty",
    COURSE_ID_IS_EMPTY: "course_id_is_empty",
    COURSE_IS_NOT_EXIST: "course_is_not_exist",
    RATING_IS_INVALID: "rating_is_invalid",
    SERVER_ERROR: "server_error",
};

export const ADD_WISHLIST = {
    SUCCESS: "add_wishlist_success",
    USER_ID_IS_EMPTY: "user_id_is_empty",
    COURSE_ID_IS_EMPTY: "course_id_is_empty",
    COURSE_IS_NOT_EXIST: "course_is_not_exist",
    SERVER_ERROR: "server_error",
};

export const UPDATE_ENROLLED = {
    SUCCESS: "update_enrolled_course_success",
    USER_ID_IS_EMPTY: "user_id_is_empty",
    COURSE_ID_IS_EMPTY: "course_id_is_empty",
    COURSE_IS_NOT_EXIST: "course_is_not_exist",
    EROLLED_COURSE_IS_NOT_EXIST: "enrolled_course_is_not_exist",
    RATING_IS_INVALID: "rating_is_invalid",
    SERVER_ERROR: "server_error",
};


export const GET_WISHLIST = {
    SUCCESS: "get_all_course_success",
    SERVER_ERROR: "server_error",
};
export const CHANGE_PASSWORD = {
    SUCCESS: "change_password_success",
    PASSWORD_IS_EMPTY: "password_is_empty",
    PASSWORD_IS_WRONG: "password_is_wrong",
    NEW_PASSWORD_IS_EMPTY: "new_password_is_empty",
    SERVER_ERROR: "server_error",
    PASSWORD_IS_LESS_THAN_6_LETTERS: "password_is_less_than_6_letters",
    NEW_PASSWORD_IS_LESS_THAN_6_LETTERS: "new_password_is_less_than_6_letters",
    USER_IS_NOT_EXIST: "user_is_not_exist",
};

export const CREATE_SECTION = {
    SUCCESS: "add_section_success",
    SECTION_NAME_IS_EMPTY: "section_name_is_empty",
    COURSE_ID_IS_EMPTY: "course_id_is_empty",
    COURSE_ID_IS_INVALID: "course_id_is_invalid",
    IS_NOT_AUTHOR: "is_not_author",
    SECTION_NAME_IS_EXIST: "section_name_is_exist",
    SERVER_ERROR: "server_error",
};

export const UPDATE_SECTION = {
    SUCCESS: "update_section_success",
    SECTION_NAME_IS_EMPTY: "section_name_is_empty",
    SECTION_ID_IS_EMPTY: "section_id_is_empty",
    SECTION_ID_IS_INVALID: "section_id_is_invalid",
    COURSE_ID_IS_EMPTY: "course_id_is_empty",
    COURSE_ID_INVALID: "course_id_is_invalid",
    IS_NOT_AUTHOR: "is_not_author",
    SECTION_NAME_IS_EXIST: "section_name_is_exist",
    SERVER_ERROR: "server_error",
};

export const GET_SECTION_BY_COURSE_ID = {
    SUCCESS: "get_all_section_success",
    COURSE_ID_IS_EMPTY: "course_id_is_empty",
    COURSE_ID_IS_EXIST: "course_id_is_exist",
    SERVER_ERROR: "server_error",
};

export const GET_LECTURE_BY_SECTION_ID = {
    SUCCESS: "get_lecture_success",
    SECTION_ID_IS_EMPTY: "section_id_is_empty",
    SECTION_ID_IS_EXIST: "section_id_is_exist",
    SECTION_ID_IS_INVALID: "section_id_is_invalid",
    SERVER_ERROR: "server_error",
};
export const CREATE_LECTURE = {
    SUCCESS: "add_lecture_success",
    LECTURE_TITLE_IS_EMPTY: "lecture_title_is_empty",
    LECTURE_TITLE_IS_EXIST: "lecture_title_is_exist",
    LECTURE_DESCRIPTION_IS_EMPTY: "lecture_description_title_is_empty",
    SECTION_ID_IS_EMPTY: "section_id_is_empty",
    SECTION_ID_IS_INVALID: "section_id_is_invalid",
    IS_NOT_AUTHOR: "is_not_author",
    SERVER_ERROR: "server_error",
};
export const CREATE_MEDIA = {
    SUCCESS: "add_media_success",
    LECTURE_ID_IS_EMPTY: "lecture_id_is_empty",
    LECTURE_IS_NOT_EXIST: "lecture_is_not_exist",
    VIDEO_IS_INVALID: "video_is_invalid",
    IS_NOT_AUTHOR: "is_not_author",
    SERVER_ERROR: "server_error",
};
export const GET_ONE_COURSE = {
    SUCCESS: "get_one_course_success",
    IS_NOT_ENROLLED_COURSE: "is_not_enrolled_course",
    SERVER_ERROR: "server_error",
    ID_IS_INVALID: "id_is_invalid",
    ID_IS_EMPTY: "id_is_empty",
};
export const DELETE_SECTION = {
    SUCCESS: "delete_success",
    SERVER_ERROR: "server_error",
    COURSE_ID_IS_NOT_EXIST: "course_id_is_not_exist",
    COURSE_ID_IS_EMPTY: "course_id_is_empty",
    SECTION_ID_IS_EMPTY: "section_id_is_empty",
    SECTION_ID_IS_NOT_EXIST: "section_id_is_not_exist",
    IS_NOT_AUTHOR: "is_not_author",
};

export const DELETE_LECTURE = {
    SUCCESS: "delete_success",
    SERVER_ERROR: "server_error",
    SECTION_ID_IS_INVALID: "section_id_is_invalid",
    SECTION_ID_IS_EMPTY: "section_id_is_empty",
    LECTURE_ID_IS_EMPTY: "lecture_id_is_empty",
    LECTURE_ID_IS_NOT_EXIST: "lecture_id_is_not_exist",
    IS_NOT_AUTHOR: "is_not_author",
};
export const UPDATE_LECTURE = {
    SUCCESS: "update_lecture_success",
    LECTURE_TITLE_IS_EMPTY: "lecture_title_is_empty",
    LECTURE_DESCRIPTION_IS_EMPTY: "lecture_description_is_empty",
    LECTURE_ID_IS_EMPTY: "lecture_id_is_empty",
    LECTURE_ID_IS_INVALID: "lecture_id_is_invalid",
    SECTION_ID_IS_EMPTY: "section_id_is_empty",
    SECTION_ID_IS_INVALID: "section_id_is_invalid",
    IS_NOT_AUTHOR: "is_not_author",
    LECTURE_TITLE_IS_EXIST: "lecture_title_is_exist",
    SERVER_ERROR: "server_error",
};

export const GET_MEDIA_BY_LECTURE_ID = {
    SUCCESS: "get_media_success",
    LECTURE_ID_IS_EMPTY: "lecture_id_is_empty",
    LECTURE_ID_IS_EXIST: "lecture_id_is_exist",
    LECTURE_ID_IS_INVALID: "lecture_id_is_invalid",
    SERVER_ERROR: "server_error",
};
export const DELETE_MEDIA = {
    SUCCESS: "delete_media_success",
    SERVER_ERROR: "server_error",
    LECTURE_ID_IS_INVALID: "lecture_id_is_invalid",
    LECTURE_ID_IS_EMPTY: "lecture_id_is_empty",
    MEDIA_ID_IS_EMPTY: "media_id_is_empty",
    MEDIA_ID_IS_NOT_EXIST: "media_id_is_not_exist",
    IS_NOT_AUTHOR: "is_not_author",
};
export const UPDATE_MEDIA = {
    SUCCESS: "update_media_success",
    LECTURE_ID_IS_INVALID: "lecture_id_is_invalid",
    VIDEO_IS_INVALID: "video_is_invalid",
    LECTURE_ID_IS_EMPTY: "lecture_id_is_empty",
    LECTURE_IS_NOT_EXIST: "lecture_is_not_exist",
    ID_IS_INVALID: "id_is_invalid",
    SERVER_ERROR: "server_error",
};

export const UPDATE_COURSE = {
    SUCCESS: "update_course_success",
    NAME_IS_EMPTY: "name_is_empty",
    NAME_IS_EXIST: "name_is_exist",
    TITLE_IS_EMPTY: "title_is_empty",
    TITLE_IS_EXIST: "title_is_exist",
    SUB_DESCRIPTION_IS_EMPTY: "sub_description_is_empty",
    DESCRIPTION_IS_EMPTY: "description_is_empty",
    IMAGE_IS_EMPTY: "image_is_empty",
    PRICE_IS_EMPTY: "price_is_empty",
    CATEGORY_IS_EMPTY: "category_is_empty",
    LANGUAGE_IS_EMPTY: "language_is_empty",
    PROMOTE_IS_EMPTY: "promote_is_empty",
    PROMOTE_IS_NOT_EXIST: "promote_is_not_exist",
    PRICE_IS_INVALID: "price_is_invalid",
    IMAGE_IS_INVALID: "image_is_invalid",
    LANGUAGE_IS_NOT_EXIST: "language_is_not_exist",
    CATEGORY_IS_NOT_EXIST: "category_is_not_exist",
    ID_IS_INVALID: "id_is_invalid",
    IS_COMPLETED_IS_EMPTY: "is_completed_is_empty",
    SERVER_ERROR: "server_error",
};

export const GET_ALL_COURSE = {
    SUCCESS: "get_all_course_success",
    SERVER_ERROR: "server_error",
    AUTHOR_IS_NOT_COURSE: "author_has_not_course",
};

export const CREATE_COURSE = {
    SUCCESS: "add_course_success",
    NAME_IS_EMPTY: "name_is_empty",
    NAME_IS_EXIST: "name_is_exist",
    TITLE_IS_EMPTY: "title_is_empty",
    TITLE_IS_EXIST: "title_is_exist",
    SUB_DESCRIPTION_IS_EMPTY: "sub_description_is_empty",
    DESCRIPTION_IS_EMPTY: "description_is_empty",
    IMAGE_IS_EMPTY: "image_is_empty",
    PRICE_IS_EMPTY: "price_is_empty",
    CATEGORY_IS_EMPTY: "category_is_empty",
    AUTHOR_IS_EMPTY: "author_is_empty",
    LANGUAGE_IS_EMPTY: "language_is_empty",
    PROMOTE_IS_EMPTY: "promote_is_empty",
    PROMOTE_IS_NOT_EXIST: "promote_is_not_exist",
    PRICE_IS_INVALID: "price_is_invalid",
    IMAGE_IS_INVALID: "image_is_invalid",
    AUTHOR_IS_NOT_EXIST: "author_is_not_exist",
    LANGUAGE_IS_NOT_EXIST: "language_is_not_exist",
    CATEGORY_IS_NOT_EXIST: "category_is_not_exist",
    SERVER_ERROR: "server_error",
};

export const GET_ALL_PROMOTES = {
    SUCCESS: "get_all_promote_success",
    SERVER_ERROR: "server_error",
};

export const GET_ALL_ENROLLED = {
    SUCCESS: "get_all_course_success",
    SERVER_ERROR: "server_error",
};

export const CREATE_FEEDBACK = {
    SUCCESS: "add_feedback_success",
    USER_ID_IS_EMPTY: "user_id_is_empty",
    COURSE_ID_IS_EMPTY: "course_id_is_empty",
    COURSE_IS_NOT_EXIST: "course_is_not_exist",
    CONTENT_IS_EMPTY: "content_is_empty",
    SERVER_ERROR: "server_error",
};

export const UPDATE_FEEDBACK = {
    SUCCESS: "update_feedback_success",
    COURSE_ID_IS_INVALID: "course_id_is_invalid",
    COURSE_ID_IS_EMPTY: "course_id_is_empty",
    CONTENT_IS_EMPTY: "content_is_empty",
    USER_ID_IS_EMPTY: "user_id_is_empty",
    USER_IS_NOT_EXIST: "user_is_not_exist",
    FEEDBACK_IS_NOT_EXIST: "feedback_is_not_exist",
    ID_IS_INVALID: "id_is_invalid",
    SERVER_ERROR: "server_error",
};


export default config;