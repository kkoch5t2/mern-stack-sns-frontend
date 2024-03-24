const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
                logout: true
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
                logout: false
            };
        case "LOGIN_ERROR":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
                logout: false
            };
        case "LOGOUT_SUCCESS":
            return {
                user: null,
                isFetching: false,
                error: false,
                logout: true
            };
        case "LOGOUT_ERROR":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
                logout: false
            };

        default:
            return state;
    }
};

export default AuthReducer;