export const getIsRegistered = (state) => {
    return state.auth.isRegistered
}

export const getCurrentUser = (state) => {
    return state.auth.currentUser
}

export const getIsAuth = (state) => {
    return state.auth.isAuth
}