const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_USERS_TOTAL_COUNT = "SET-USERS-TOTAL-COUNT"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_ISFETCHING = "SET_ISFETCHING"

const initialState = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    perPage: 4,
    isFetching: false
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
        case SET_ISFETCHING: 
            return {
                ...state,
                isFetching: action.isFetching
            }

        default:
            return state;
    }
    // users: [...state.users, ...action.users]
};

export const follow = (userId) => ({
    type: FOLLOW,
    userId,
});
export const unfollow = (userId) => ({
    type: UNFOLLOW,
    userId,
});
export const setUsers = (users) => ({
    type: SET_USERS,
    users,
});
export const setUsersTotalCount = (totalCount) => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount
})
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setIsFetching = (isFetching) => ({
    type: SET_ISFETCHING,
    isFetching
})

export default usersReducer;
