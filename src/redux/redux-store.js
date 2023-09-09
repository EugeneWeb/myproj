import { legacy_createStore, combineReducers } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBarPage: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

const store = legacy_createStore(reducers)

window.store = store

export default store