const config = {
    "HOST": "http://localhost",
    "PORT": "8000",
    "USER_CONTROLLER": "users",
    "COURSE_CONTROLLER": "courses",
    "CATEGORY_CONTROLLER": "categories",
    "ENROLLED": "enrolled",
};

export const ROUTES = {
    home: "/",
    courseDetail: "/course/detail",
    profile: "/profile",
    myLearning: "/my-learning",
    createCourse: "/course/create",
    editCourse: "/course/edit",
    admin: "/admin",
    instructor: "/instructor",
    search: "/course/search",
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

export default config;