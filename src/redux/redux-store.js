import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBarPage: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

const store = legacy_createStore(reducers, applyMiddleware(thunk))

window.store = store

export default store