const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                error: false,
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                data: action.payload,
            };
        case "FETCH_ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            throw new Error('Action is invalid');
    }
};

export default dataFetchReducer;