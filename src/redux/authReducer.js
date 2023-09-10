import { usersAPI } from "../api/api";
import {
    deleteFollowingInProgress,
    setFollowingInProgress,
} from "./users-reducer";

const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const SET_IS_REGISTERED = "SET_REGISTERED";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";

const initialState = {
    currentUser: {},
    isAuth: false,
    isRegistered: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: [...state.currentUser.following, action.userId],
                },
            };
        case UNFOLLOW:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: state.currentUser.following.filter(
                        (id) => id !== action.userId
                    ),
                },
            };
        case SET_USER:
            return {
                ...state,
                currentUser: action.user,
                isAuth: true,
            };
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            };
        case SET_IS_REGISTERED:
            return {
                ...state,
                isRegistered: action.isRegistered,
            };

        default:
            return state;
    }
};

export const setUser = (user) => ({
    type: SET_USER,
    user,
});
export const setLogout = () => ({
    type: LOGOUT,
});
export const setIsRegistered = (isRegistered) => ({
    type: SET_IS_REGISTERED,
    isRegistered,
});
export const followSuccess = (userId) => ({
    type: FOLLOW,
    userId,
});
export const unfollowSuccess = (userId) => ({
    type: UNFOLLOW,
    userId,
});

export const loginUser = (login, password) => (dispatch) => {
    usersAPI.login(login, password).then((userAuth) => {
        dispatch(setUser(userAuth.user));
        localStorage.setItem("token", userAuth.token);
    });
};

export const userRegistration = (username, email, password) => (dispatch) => {
    dispatch(setIsRegistered(false));
    usersAPI.registration(username, email, password).then((regMsg) => {
        dispatch(setIsRegistered(true));
    });
};

export const unfollow = (userId) => (dispatch) => {
    dispatch(setFollowingInProgress(userId));
    usersAPI.unfollow(userId).then((resp) => {
        dispatch(deleteFollowingInProgress(userId));

        if (resp.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
    });
};

export const follow = (userId) => (dispatch) => {
    dispatch(setFollowingInProgress(userId));
    usersAPI.follow(userId).then((resp) => {
        dispatch(deleteFollowingInProgress(userId));

        if (resp.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
    });
};

export default authReducer;
