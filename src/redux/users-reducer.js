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
};

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
