import { createSelector } from "reselect"
import { AppStateType } from "./redux-store"

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

// Пример использования reselect(перед callback'ом можем указывать примитивные селекторы в любом количестве)
export const getUsersSuper = createSelector(getUsers, (users) => {
    return users
})

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getTotalCount = (state: AppStateType) => {
    return state.usersPage.totalCount
}

export const getPerPage = (state: AppStateType) => {
    return state.usersPage.perPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

