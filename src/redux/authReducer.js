const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const SET_IS_REGISTERED = 'SET_REGISTERED'

const initialState = {
    currentUser: {},
    isAuth: false,
    isRegistered: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.user,
                isAuth: true
            };
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            };
        case SET_IS_REGISTERED:
            return {
                ...state,
                isRegistered: action.isRegistered
            };

        default:
            return state;
    }
};

export const setUser = (user) => ({
    type: SET_USER,
    user
});
export const setLogout = () => ({
    type: LOGOUT,
});
export const setIsRegistered = (isRegistered) => ({
    type: SET_IS_REGISTERED,
    isRegistered
});

export default authReducer;
