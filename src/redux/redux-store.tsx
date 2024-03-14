import { legacy_createStore, combineReducers, applyMiddleware, compose, Action } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./authReducer";
import thunk, { ThunkAction } from "redux-thunk";
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
export type AppStateType = ReturnType<typeof reducers>

export type BaseThunkActionType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type InferActionsType<T extends { [propname: string]: (...args: any) => any}> = T extends { [propname: string]: (...args: any) => infer U} ? U: never


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

// const store = legacy_createStore(reducers, applyMiddleware(thunk))

// window.store = store

export default store