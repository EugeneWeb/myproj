const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_USERS_TOTAL_COUNT = "SET-USERS-TOTAL-COUNT"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"

const initialState = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    perPage: 4
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: false,
                        };
                    }
                    return user
                }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId) {
                        return {
                            ...user,
                            followed: true
                        }
                    }
                    return user
                })
            }

        case SET_USERS: 
            return {
                ...state,
                users: [...action.users]
            }
        case SET_USERS_TOTAL_COUNT: 
            return {
                ...state,
                totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE: 
            return {
                ...state,
                currentPage: action.currentPage
            }

        default:
            return state;
    }
    // users: [...state.users, ...action.users]
};

export const followAC = (userId) => ({
    type: FOLLOW,
    userId,
});
export const unfollowAC = (userId) => ({
    type: UNFOLLOW,
    userId,
});
export const setUsersAC = (users) => ({
    type: SET_USERS,
    users,
});
export const setUsersTotalCountAC = (totalCount) => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount
})
export const setCurrentPageAC = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export default usersReducer;
