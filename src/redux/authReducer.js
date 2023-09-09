const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const SET_IS_REGISTERED = 'SET_REGISTERED'
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";


const initialState = {
    currentUser: {},
    isAuth: false,
    isRegistered: false
};

const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case UNFOLLOW:
            return {
                ...state,
                currentUser: {...state.currentUser, following: [...state.currentUser.following, action.userId]}
            };
        case FOLLOW:
            return {
                ...state,
                currentUser: {...state.currentUser, following: state.currentUser.following.filter(id => id !== action.userId)}
            };
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
export const follow = (userId) => ({
    type: FOLLOW,
    userId,
});
export const unfollow = (userId) => ({
    type: UNFOLLOW,
    userId,
});

export default authReducer;
