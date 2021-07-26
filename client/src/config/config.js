const config = {
    "HOST": "http://localhost",
    "PORT": "8000",
    "USER_CONTROLLER": "users",
    "COURSE_CONTROLLER": "courses",
    "CATEGORY_CONTROLLER": "categories",
    "ENROLLED": "enrolled",
};


export const GET_PARAMS = {
    popup: "auth",
    notificationId: "notification-id",
};

export const GET_ENUMS = {
    popup: {
        signIn: "sign-in",
        signUp: "sign-up",
        notifications: "notifications",
        notificationDetails: "notification-details",
    },
};

export default config;