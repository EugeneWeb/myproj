import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import { reducer as FormReducer } from 'redux-form'
import appReducer from "./appReducer";


// Обязательно назвать form
const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBarPage: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: FormReducer
})

const store = legacy_createStore(reducers, applyMiddleware(thunk))

window.store = store

export default store