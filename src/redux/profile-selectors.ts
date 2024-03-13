import { AppStateType } from "./redux-store"

export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts
}

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}
