import { createSelector } from "reselect"

export const getUsers = (state) => {
    return state.usersPage.users
}

// Пример использования reselect(перед callback'ом можем указывать примитивные селекторы в любом количестве)
export const getUsersSuper = createSelector(getUsers, (users) => {
    return users
})

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}

export const getPerPage = (state) => {
    return state.usersPage.perPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}

