import { UserType } from "types/types";
import { ProfileActionsType, profileActions } from "./profile-reducer";
import { BaseThunkActionType, InferActionsType } from "./redux-store";
import { ResultCodesEnum } from "../api/api";
import { profileAPI } from "api/profile-api";
import { usersAPI } from "api/users-api";



const initialState = {
    users: [] as UserType[],
    currentPage: 1,
    totalCount: 0,
    perPage: 4,
    isFetching: false,
    followingInProgress: [] as string[], //Array of users ids
};

const usersReducer = (state = initialState, action: UsersActionsType) => {
    switch (action.type) {
        case '/users/SET-USERS':
            return {
                ...state,
                users: [...action.users],
            };
        case '/users/SET-USERS-TOTAL-COUNT':
            return {
                ...state,
                totalCount: action.totalCount,
            };
        case '/users/SET-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case '/users/SET_ISFETCHING':
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case '/users/SET_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: [
                    ...state.followingInProgress,
                    action.userId,
                ],
            };
        case '/users/DELETE_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: state.followingInProgress.filter(
                    (id) => id !== action.userId
                ),
            };

        default:
            return state;
    }
};

export const usersActions = {
    setUsers: (users) =>
        ({
            type: "/users/SET-USERS",
            users,
        } as const),
    setUsersTotalCount: (totalCount) =>
        ({
            type: "/users/SET-USERS-TOTAL-COUNT",
            totalCount,
        } as const),
    setCurrentPage: (currentPage) =>
        ({
            type: "/users/SET-CURRENT-PAGE",
            currentPage,
        } as const),
    setIsFetching: (isFetching) =>
        ({
            type: "/users/SET_ISFETCHING",
            isFetching,
        } as const),
    setFollowingInProgress: (userId) =>
        ({
            type: "/users/SET_FOLLOWING_IN_PROGRESS",
            userId,
        } as const),
    deleteFollowingInProgress: (userId) =>
        ({
            type: "/users/DELETE_FOLLOWING_IN_PROGRESS",
            userId,
        } as const),
};



export const requestUsers =
    (perPage: number, currentPage: number): UsersThunkActionType =>
    async (dispatch: any) => {
        try {
            await dispatch(usersActions.setIsFetching(true));
            const resp = await usersAPI.getUsers(perPage, currentPage);
            if(resp.resultCode === ResultCodesEnum.Success) {
                await dispatch(usersActions.setIsFetching(false));

                dispatch(usersActions.setCurrentPage(currentPage));
                dispatch(usersActions.setUsers(resp.items));
                dispatch(usersActions.setUsersTotalCount(resp.totalCount));
            }
        } catch (error) {}
    };

export const requestProfile = (userId: string): ProfileThunkActionType => async (dispatch: any) => {
    try {
        const profile = await profileAPI.setProfile(userId);
        if(profile.resultCode === ResultCodesEnum.Success) {
            dispatch(profileActions.setUsersProfile(profile.user));
        }
        
    } catch (error) {}
};

export default usersReducer;

type UsersThunkActionType = BaseThunkActionType<UsersActionsType>
type ProfileThunkActionType = BaseThunkActionType<ProfileActionsType>

export type InitialStateType = typeof initialState;
export type UsersActionsType = InferActionsType<typeof usersActions>;
