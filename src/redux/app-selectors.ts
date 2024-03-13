import { AppStateType } from "./redux-store"

export const getIsInitialized = (state: AppStateType) => {
    return state.app.isInitialized
}