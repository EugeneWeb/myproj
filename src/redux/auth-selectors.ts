import { AppStateType } from "./redux-store"

export const getIsRegistered = (state: AppStateType) => {
    return state.auth.isRegistered
}

export const getCurrentUser = (state: AppStateType) => {
    return state.auth.currentUser
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}