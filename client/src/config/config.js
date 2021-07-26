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

export default config;