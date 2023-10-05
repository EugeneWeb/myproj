import { profileAPI, usersAPI } from "../api/api";
import { setUsersProfile } from "./profile-reducer";

const SET_USERS = "SET-USERS";
const SET_USERS_TOTAL_COUNT = "SET-USERS-TOTAL-COUNT";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_ISFETCHING = "SET_ISFETCHING";
const SET_FOLLOWING_IN_PROGRESS = "SET_FOLLOWING_IN_PROGRESS";
const DELETE_FOLLOWING_IN_PROGRESS = "DELETE_FOLLOWING_IN_PROGRESS";

const initialState = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    perPage: 4,
    isFetching: false,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
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

export const setUsers = (users) => ({
    type: SET_USERS,
    users,
});
export const setUsersTotalCount = (totalCount) => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount,
});
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});
export const setIsFetching = (isFetching) => ({
    type: SET_ISFETCHING,
    isFetching,
});
export const setFollowingInProgress = (userId) => ({
    type: SET_FOLLOWING_IN_PROGRESS,
    userId,
});
export const deleteFollowingInProgress = (userId) => ({
    type: DELETE_FOLLOWING_IN_PROGRESS,
    userId,
});

export const requestUsers = (perPage, currentPage) => (dispatch) => {
    dispatch(setIsFetching(true));

    usersAPI.getUsers(perPage, currentPage).then((resp) => {
        dispatch(setCurrentPage(currentPage))

        dispatch(setIsFetching(false));

        dispatch(setUsers(resp.users));
        dispatch(setUsersTotalCount(resp.totalCount));
    });
};

export const requestProfile = (userId) => (dispatch) => {
    profileAPI.setProfile(userId).then((resp) => {
        dispatch(setUsersProfile(resp));
    });
};



export default usersReducer;
