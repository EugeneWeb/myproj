import { stopSubmit } from "redux-form";
import { ResultCodesEnum} from "../api/api";
import { ProfileActionsType, profileActions } from "./profile-reducer";
import { UsersActionsType, usersActions } from "./users-reducer";
import { AppActionsType, appActions } from "./appReducer";
import { ProfileType } from "types/types";
import { BaseThunkActionType, InferActionsType } from "./redux-store";
import { Dispatch } from "redux";
import { authAPI } from "api/auth-api";
import { profileAPI } from "api/profile-api";
import { usersAPI } from "api/users-api";



const initialState = {
    currentUser: {} as ProfileType,
    isAuth: false,
    isRegistered: false,
};

const authReducer = (state = initialState, action: AuthActionsType) => {
    switch (action.type) {
        case '/auth/FOLLOW':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: [...state.currentUser.following, action.userId],
                },
            };
        case '/auth/UNFOLLOW':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: state.currentUser.following.filter(
                        (id) => id !== action.userId
                    ),
                },
            };
        case '/auth/SET_USER':
            return {
                ...state,
                currentUser: action.user,
                isAuth: true,
            };
        case '/auth/LOGOUT':
            localStorage.removeItem("token");
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            };
        case '/auth/SET_REGISTERED':
            return {
                ...state,
                isRegistered: action.isRegistered,
            };
        case '/auth/SET_STATUS':
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

export const authActions = {
    setUser: (user: ProfileType) =>
        ({
            type: "/auth/SET_USER",
            user,
        } as const),
    setLogout: () =>
        ({
            type: "/auth/LOGOUT",
        } as const),
    setIsRegistered: (isRegistered: boolean) =>
        ({
            type: "/auth/SET_REGISTERED",
            isRegistered,
        } as const),
    followSuccess: (userId: string) =>
        ({
            type: "/auth/FOLLOW",
            userId,
        } as const),
    unfollowSuccess: (userId: string) =>
        ({
            type: "/auth/UNFOLLOW",
            userId,
        } as const),

    setStatus: (status: string) =>
        ({
            type: "/auth/SET_STATUS",
            status,
        } as const),
};

export const loginUser =
    (
        login: string,
        password: string
    ): BaseThunkActionType<AuthActionsType | ReturnType<typeof stopSubmit>> =>
    async (dispatch) => {
        try {
            const userAuth = await usersAPI.login(login, password);

            if (userAuth.resultCode === ResultCodesEnum.Success) {
                dispatch(authActions.setUser(userAuth.user));
                localStorage.setItem("token", userAuth.token);
            } else {
                dispatch(stopSubmit("login", { _error: userAuth.message }));
            }
        } catch (error) {}
    };

export const userRegistration =
    (
        username: string,
        email: string,
        password: string
    ): BaseThunkActionType<AuthActionsType | ReturnType<typeof stopSubmit>> =>
    async (dispatch) => {
        try {
            await dispatch(authActions.setIsRegistered(false));
            const regObj = await usersAPI.registration(
                username,
                email,
                password
            );
            if (regObj.resultCode === ResultCodesEnum.Success) {
                dispatch(authActions.setIsRegistered(true));
            } else {
                dispatch(
                    stopSubmit("registration", { _error: regObj.message })
                );
            }
        } catch (error) {}
    };

const followUnfollowFlow = async (
    dispatch: Dispatch<AuthActionsType | UsersActionsType> ,
    userId: string,
    apiMethod: typeof usersAPI.follow | typeof usersAPI.unfollow,
    actionCreator: typeof authActions.unfollowSuccess | typeof authActions.followSuccess
) => {
    try {
        await dispatch(usersActions.setFollowingInProgress(userId));
        const resp = await apiMethod(userId);
        await dispatch(usersActions.deleteFollowingInProgress(userId));

        if (resp.resultCode === ResultCodesEnum.Success) {
            dispatch(actionCreator(userId));
        }
    } catch (error) {}
};

export const unfollow = (userId: string): AuthThunkActionType => async (dispatch) => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI);
    followUnfollowFlow(
        dispatch,
        userId,
        apiMethod,
        authActions.unfollowSuccess
    );
};

export const follow = (userId: string): AuthThunkActionType => async (dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, authActions.followSuccess);
};

export const me = async (dispatch: Dispatch<AppActionsType | AuthActionsType>) => {
    try {
        const resp = await authAPI.me();

        if(resp.resultCode === ResultCodesEnum.Success) {
            await dispatch(authActions.setUser(resp.user));
            dispatch(appActions.setInitialized());
        }
    } catch (error) {
        dispatch(appActions.setInitialized());
        localStorage.removeItem("token");
    }
};

export const getStatus = (status: string): BaseThunkActionType<AuthActionsType | ProfileActionsType> => async (dispatch) => {
    try {
        const resp = await profileAPI.updateStatus(status);

        if (resp.resultCode === ResultCodesEnum.Success) {
            dispatch(authActions.setStatus(status));
            dispatch(profileActions.setProfileStatus(status));
        }
    } catch (error) {}
};

export default authReducer;

type AuthThunkActionType = BaseThunkActionType<AuthActionsType>

export type InitialStateType = typeof initialState;
export type AuthActionsType = InferActionsType<typeof authActions>;
