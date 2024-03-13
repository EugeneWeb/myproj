import { AppStateType } from "./redux-store"

export const getDialogs = (state: AppStateType) => {
    return state.dialogsPage.dialogs
}

export const getMessages = (state: AppStateType) => {
    return state.dialogsPage.messages
}

export const getNewMessageBody = (state: AppStateType) => {
    return state.dialogsPage.newMessageBody
}