import { UserType } from "types/types";
import { profileAPI, usersAPI } from "../api/api";
import { setUsersProfile } from "./profile-reducer";

const SET_USERS = "/users/SET-USERS";
const SET_USERS_TOTAL_COUNT = "/users/SET-USERS-TOTAL-COUNT";
const SET_CURRENT_PAGE = "/users/SET-CURRENT-PAGE";
const SET_ISFETCHING = "/users/SET_ISFETCHING";
const SET_FOLLOWING_IN_PROGRESS = "/users/SET_FOLLOWING_IN_PROGRESS";
const DELETE_FOLLOWING_IN_PROGRESS = "/users/DELETE_FOLLOWING_IN_PROGRESS";

const initialState = {
    users: [] as UserType[],
    currentPage: 1,
    totalCount: 0,
    perPage: 4,
    isFetching: false,
    followingInProgress: [] as string[], //Array of users ids
};

const usersReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            };
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case SET_ISFETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: [
                    ...state.followingInProgress,
                    action.userId,
                ],
            };
        case DELETE_FOLLOWING_IN_PROGRESS:
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

type SetUsersType = ReturnType<typeof setUsers>
export const setUsers = (users) => ({
    type: SET_USERS,
    users,
} as const);
type SetUsersTotalCountType = ReturnType<typeof setUsersTotalCount>
export const setUsersTotalCount = (totalCount) => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount,
} as const);
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
} as const);
type SetIsFetchingType = ReturnType<typeof setIsFetching>
export const setIsFetching = (isFetching) => ({
    type: SET_ISFETCHING,
    isFetching,
} as const);
type SetFollowingInProgressType = ReturnType<typeof setFollowingInProgress>
export const setFollowingInProgress = (userId) => ({
    type: SET_FOLLOWING_IN_PROGRESS,
    userId,
} as const);
type DeleteFollowingInProgressType = ReturnType<typeof deleteFollowingInProgress>
export const deleteFollowingInProgress = (userId) => ({
    type: DELETE_FOLLOWING_IN_PROGRESS,
    userId,
} as const);

export const requestUsers = (perPage: number, currentPage: number) => async (dispatch: any) => {
    try {
        await dispatch(setIsFetching(true));
        const resp = await usersAPI.getUsers(perPage, currentPage);
        await dispatch(setIsFetching(false));

        dispatch(setCurrentPage(currentPage));
        dispatch(setUsers(resp.users));
        dispatch(setUsersTotalCount(resp.totalCount));
    } catch (error) {}

    // dispatch(setIsFetching(true));
    // usersAPI.getUsers(perPage, currentPage).then((resp) => {
    //     dispatch(setCurrentPage(currentPage))

    //     dispatch(setIsFetching(false));

    //     dispatch(setUsers(resp.users));
    //     dispatch(setUsersTotalCount(resp.totalCount));
    // });
};

export const requestProfile = (userId: string) => async (dispatch: any) => {
    try {
        const profiles = await profileAPI.setProfile(userId);
        dispatch(setUsersProfile(profiles));
    } catch (error) {}

    // profileAPI.setProfile(userId).then((resp) => {
    //     dispatch(setUsersProfile(resp));
    // });
};

export default usersReducer;

export type InitialStateType = typeof initialState
type ActionsType =  SetUsersType |
SetUsersTotalCountType |
SetCurrentPageType |
SetIsFetchingType |
SetFollowingInProgressType |
DeleteFollowingInProgressType 
