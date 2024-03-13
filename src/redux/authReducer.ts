import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, usersAPI } from "../api/api";
import { setProfileStatus } from "./profile-reducer";
import {
    deleteFollowingInProgress,
    setFollowingInProgress,
} from "./users-reducer";
import { setInitialized } from "./appReducer";
import { updateObjectInArray } from "../utils/object-helpers";
import { ProfileType } from "types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const SET_USER = "/auth/SET_USER";
const LOGOUT = "/auth/LOGOUT";
const SET_IS_REGISTERED = "/auth/SET_REGISTERED";
const FOLLOW = "/auth/FOLLOW";
const UNFOLLOW = "/auth/UNFOLLOW";
const SET_STATUS = "/auth/SET_STATUS";


// currentUser - ProfileType
const initialState = {
    currentUser: {} as ProfileType,
    isAuth: false,
    isRegistered: false,
};



const authReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: [...state.currentUser.following, action.userId],
                }
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
        case SET_STATUS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    status: action.status,
                },
            };

        default:
            return state;
    }
};

type SetUserType = ReturnType<typeof setUser>
export const setUser = (user: ProfileType) => ({
    type: SET_USER,
    user,
} as const);
type SetLogoutType = ReturnType<typeof setLogout>
export const setLogout = () => ({
    type: LOGOUT,
} as const);
type SetIsRegisteredType = ReturnType<typeof setIsRegistered>
export const setIsRegistered = (isRegistered: boolean) => ({
    type: SET_IS_REGISTERED,
    isRegistered,
} as const);
type FollowSuccessType = ReturnType<typeof followSuccess>
export const followSuccess = (userId: string) => ({
    type: FOLLOW,
    userId,
} as const);
type UnfollowSuccessType = ReturnType<typeof unfollowSuccess>
export const unfollowSuccess = (userId: string) => ({
    type: UNFOLLOW,
    userId,
} as const);

type SetStatusType = ReturnType<typeof setStatus>
export const setStatus = (status: string) => ({
    type: SET_STATUS,
    status,
} as const);

export const loginUser = (login: string, password: string) => async (dispatch: any) => {
    try {
        const userAuth = await usersAPI.login(login, password);

        if (userAuth.info.resultCode === 0) {
            dispatch(setUser(userAuth.user));
            localStorage.setItem("token", userAuth.token);
        } else {
            dispatch(stopSubmit("login", { _error: userAuth.message }));
        }
    } catch (error) {}

    // usersAPI.login(login, password).then((userAuth) => {
    //     if(userAuth.info.resultCode === 0) {
    //         dispatch(setUser(userAuth.user));
    //         localStorage.setItem("token", userAuth.token);
    //     }
    //     else {
    //         dispatch(stopSubmit('login',{_error: userAuth.message}))
    //     }

    // });
};

export const userRegistration =
    (username: string, email: string, password: string): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType | ReturnType<typeof stopSubmit>> => (async (dispatch) => {
        try {
            await dispatch(setIsRegistered(false));
            const regObj = await usersAPI.registration(
                username,
                email,
                password
            );
            if (regObj.info.resultCode === 0) {
                dispatch(setIsRegistered(true));
            } else {
                dispatch(
                    stopSubmit("registration", { _error: regObj.message })
                );
            }
        } catch (error) {}

        // dispatch(setIsRegistered(false));
        // usersAPI.registration(username, email, password).then((regObj) => {
        //     if (regObj.info.resultCode === 0) {
        //         dispatch(setIsRegistered(true));
        //     } else {
        //         dispatch(stopSubmit("registration", { _error: regObj.message }));
        //     }
        // });
    });

const followUnfollowFlow = async (
    dispatch,
    userId,
    apiMethod,
    actionCreator
) => {
    try {
        await dispatch(setFollowingInProgress(userId));
        const resp = await apiMethod(userId);
        await dispatch(deleteFollowingInProgress(userId));

        if (resp.resultCode === 0) {
            dispatch(actionCreator(userId));
        }
    } catch (error) {}
};

export const unfollow = (userId: string) => (dispatch: any) => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
    // try {
    //     const methodApi = usersAPI.unfollow.bind(usersAPI)
    //     const actionCreator = unfollowSuccess
    //     followUnfollowFlow(dispatch, userId, methodApi, actionCreator)
    //     // await dispatch(setFollowingInProgress(userId));
    //     // const resp = await usersAPI.unfollow(userId);
    //     // await dispatch(deleteFollowingInProgress(userId));

    //     // if (resp.resultCode === 0) {
    //     //     dispatch(unfollowSuccess(userId));
    //     // }
    // } catch (error) {}

    // dispatch(setFollowingInProgress(userId));
    // usersAPI.unfollow(userId).then((resp) => {
    //     dispatch(deleteFollowingInProgress(userId));

    //     if (resp.resultCode === 0) {
    //         dispatch(unfollowSuccess(userId));
    //     }
    // });
};

export const follow = (userId: string) => (dispatch: any) => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
    // try {
    //     const methodApi = usersAPI.follow.bind(usersAPI)
    //     const actionCreator = followSuccess
    //     followUnfollowFlow(dispatch, userId, methodApi, actionCreator)
    //     // await dispatch(setFollowingInProgress(userId));
    //     // const resp = await usersAPI.follow(userId);
    //     // await dispatch(deleteFollowingInProgress(userId));

    //     // if (resp.resultCode === 0) {
    //     //     dispatch(followSuccess(userId));
    //     // }
    // } catch (error) {}

    // dispatch(setFollowingInProgress(userId));
    // usersAPI.follow(userId).then((resp) => {
    //     dispatch(deleteFollowingInProgress(userId));

    //     if (resp.resultCode === 0) {
    //         dispatch(followSuccess(userId));
    //     }
    // });
};

export const me = async (dispatch: any) => {
    try {
        const resp = await authAPI.me();

        await dispatch(setUser(resp.user));
        dispatch(setInitialized());
    } catch (error) {
        dispatch(setInitialized());
        // console.log(error);
        localStorage.removeItem("token");
    }
};

export const getStatus = (status: string) => async (dispatch: any) => {
    try {
        const resp = await profileAPI.updateStatus(status);

        if (resp.user.resultCode === 1) {
            dispatch(setStatus(status));
            dispatch(setProfileStatus(status));
        }
    } catch (error) {}

    // profileAPI.updateStatus(status).then((resp) => {
    //     if (resp.user.resultCode === 1) {
    //         dispatch(setStatus(status));
    //         dispatch(setProfileStatus(status));
    //     }
    // });
};

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsType =  SetUserType 
| SetLogoutType 
| SetIsRegisteredType 
| FollowSuccessType
| UnfollowSuccessType 
| SetStatusType 

