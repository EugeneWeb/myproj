import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";

import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Error from "./components/Error/Error";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

// const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));

import ProfileContainer from "./components/Profile/ProfileContainer";
import RegistrationContainer from "./components/Registration/RegistrationContainer";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, useDispatch } from "react-redux";

import { me } from "./redux/authReducer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import Preloader from "./components/common/Preloader/Preloader";
import { getIsInitialized } from "./redux/app-selectors";
import { getIsAuth } from "./redux/auth-selectors";
const UsersContainer = React.lazy(() =>
    import("./components/Users/UsersContainer")
);

// Как мы исправили типизация action creator'ов, как типизировать thunk creator'ы(2), что по умолчанию возвращает ассинхронная функция, как самостоятельно гуглить типизацию, как типизировать API, для чего и как используем enum, 
// Можно ли объявлять типы до объявления переменных?
// Типизация dispatch с stopSubmit
// в каком порядке типизируем
// какой тип используем для файла
// Куда выносим типы 
// Важно про дженерики и ResultCode
// Объединение enum
// Типизация констант






// Как мы исправили типизация action creator'ов
// С помощью условного типа, который пробегает по всем свойствам объекта actions и возвращает union type из типов всех объектов, возвращаемых из action creator'ов
// InferActionsType<T extends { [propname: string]: (...args: any) => any}> = T extends { [propname: string]: (...args: any) => infer U} ? U: never

// как типизировать thunk creator'ы(2)
// 1 способ в лоб, задавая тип getState и dispatch
// type GetStateType = () => AppStateType
// а для dispatch через тип redux'а Dispatch<типы всех action'ов> 
// Пример:
// type GetAppState = () => AppStateType; - общий тип для getState
// export const requestUsers =
//     (perPage: number, currentPage: number) =>
//     async (dispatch: Dispatch<ActionsType>, getState: GetAppState) => {
//         try {
//             await dispatch(usersActions.setIsFetching(true));
//             const resp = await usersAPI.getUsers(perPage, currentPage);
//             await dispatch(usersActions.setIsFetching(false));

//             dispatch(usersActions.setCurrentPage(currentPage));
//             dispatch(usersActions.setUsers(resp.users));
//             dispatch(usersActions.setUsersTotalCount(resp.totalCount));
//         } catch (error) {}
//     };

// 2 способ через ThunkAction<>, что по умолчанию возвращает ассинхронная функция
// Тогда создаём обобщенный тип для упрощения написания типа:
// type BaseThunkActionType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// Где R - ReturnType - возвращаемый Thunk'ом тип
// A - тип action'ов, которые принимает dispatch
// по умолчанию ассинхронная функция возвращает Promise<void>

// как самостоятельно гуглить типизацию
// redux-form typescript example

// как типизировать API, для чего и как используем enum
// все функции axios являются дженериками: axios.get<> и т.д, в угловых скобках мы задаём тип resp.data
// Разделяем файл api на отдельные файлы: api.ts, где находятся общие типы и для resultCodes пишем enum для того, чтобы избавиться от магических чисел, при этом ВАЖНО!!! в type добавляем сам EnumName, а не typeof EnumName, иначе ts будет просить именно сам enum, а не значения его свойств
// все типы уносим вниз api

// Типизация dispatch с stopSubmit
// для этого к ActionsType добавляем:
// | ReturnType<typeof stopSubmit> - но тогда тоже не совсем правильно, так как возвращаемый тип экстендиться от типа Action и получим то, что в dispatch можно передавать в качестве аргумента любые action'ы

// в каком порядке типизируем
// DAL(api)
// BLL(Container components)
// UI(Presentational components)

// Можно ли объявлять типы до объявления переменных?
// Да, ts компилятор такое позволяет

// какой тип используем для файла
// :File

// Куда выносим типы 
// В самый низ

// Важно про дженерики и ResultCode
// Если при типизации Api у нас возникает проблема, связанная с тем, что тип enum'ов отличается, то делаем дженерик, в котором resultCode: RC

// Объединение enum
// Для этого используем &
// resultCode: Enum1 & Enum2


// Типизация констант
// Константы с типами action'ов можно убрать, так как ts сам подсказывает эти типы



function App(props) {
    const dispatch = useDispatch();

    useEffect(
        () => () => {
            dispatch(me);
        },
        [dispatch]
    );

    if (!props.isInitialized) return <Preloader />;

    return (
        <Router>
            <div className={props.isAuth ? s.wrapAuth : s.wrapNotAuth}>
                <HeaderContainer notAuthClassName={s.header} />
                {props.isAuth && <NavBarContainer />}
                <div className={s.content}>
                    <React.Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route path="/" element={<ProfileContainer />} />
                            <Route
                                path="/profile"
                                element={<ProfileContainer />}
                            />
                            <Route
                                path="/profile/:userId"
                                element={<ProfileContainer />}
                            />
                            <Route path="/news" element={<News />} />
                            <Route
                                path="/messages/*"
                                element={<DialogsContainer />}
                            />
                            <Route path="/music" element={<Music />} />
                            <Route path="/settings" element={<Settings />} />

                            <Route path="/users" element={<UsersContainer />} />

                            <Route path="/login" element={<LoginContainer />} />
                            <Route
                                path="/registration"
                                element={<RegistrationContainer />}
                            />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </React.Suspense>
                </div>
            </div>
        </Router>
    );
}

const mapStateToProps = (state) => ({
    isInitialized: getIsInitialized(state),
    isAuth: getIsAuth(state),
});

export default connect(mapStateToProps, null)(App);
