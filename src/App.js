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

// Типизация connect(контейнерных компонент), как посмотреть принимаемые джененериком типы
// Как исправить проблему с импортом React(2 способа)
// Типизация compose
// Типизация хуков
// Как узнать тип любой переменной(на примере возвращаемого значения useParams)
// Как легко задать тип для e(event)
// Типизация LoginContainer и RegistrationContainer, ПОДВОХ




// Типизация connect(контейнерных компонент)
// Для этого разбиваем PropsType на MapStatePropsType, MapDispatchPropsType, OwnPropsType
// т.е на пропсы, которые пришли из MSTP, MDTP и на OwnPropsType, которые получает компонента через атрибуты(<Component users={users} />)
// Далее пишем
// connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>()()
// т.е connect - дженерик

// как посмотреть принимаемые джененериком типы
// Просто нажимаем ctrl+click и смотрим(например, для connect)

// Как исправить проблему с импортом React(2 способа)
// Для этого используем след. синтаксис:
// import * as React from 'react'; - лучше этот
// Или добавляем в tsconfig:
//"esModuleInterop": true

// Типизация compose
// compose<React.ComponentType>(
//     connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, MDTP),
//     withAuthRedirect
// )(UsersContainer)

// Типизация хуков
// Как правило, все хуки являются дженерик функциями, поэтому можем писать принимаемый тип так(при этом если указываем начальное значение, то типизировать необязательно):
// useState(1)
// useState<number | null>(null)

// Как узнать тип любой переменной(на примере возвращаемого значения useParams)
// Просто объявляем переменную любого типа, например, number(заведомо зная, что это неправильный тип) и смотрим ошибку, в которой написан правильный тип:
// const n: number = useParams()
// Узнали тип:
// params: Readonly<Params<string>>

// Как легко задать тип для e(event)
// Также как и с useParams, просто объявляем неправильный тип для e

// Типизация LoginContainer и RegistrationContainer, ПОДВОХ
// Подвох заключается в типах ThunkCreator функкциях: userRegistration и loginUser, которые возвращают void(если писать, что возвращают ThunkAction или Promise<void> - ошибка)

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
