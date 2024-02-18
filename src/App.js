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

// Исправление paginator, во что упаковываются все js файлы, почему,
// что такое lazy загрузка, зачем нужна, когда стоит использовать, что выбрать быструю загрузку в начале и медленное перемещение по страницам или медленную загразку вначале и быстрый переход по страницам?
// как сборщик собирает компоненты в кучу? Как работает lazy в react(куда попадает, как загружается)
// react lazy/react suspense, ошибка, которая может возникнуть при добавлении lazy загрузки(с импортами)
// Как можно выложить fullstack(react+node.js) приложение бесплатно?




// во что упаковываются все js файлы, почему
// все js файлы упаковываются в 3 больших файлы(bundle.js, chunk.js)
// это связано с тем, что по http протоколу быстрее грузить одним большим файлом, нежели несколькими малыми(http2 чуть ускоряет это)

// что такое lazy загрузка, зачем нужна
// lazy загрузка - загрузка компонент по мере необходимости, в ходе использования нашего приложения, нужна для оптимизации первой загрузки и дальнейшего взаимодействия со страницей

// когда стоит использовать
// используется для тех компонент, которые пользователь скорее всего будет видит всегда/вероятнее всего поситит при первом появлении на сайте

// что выбрать быструю загрузку в начале и медленное перемещение по страницам или медленную загразку вначале и быстрый переход по страницам?
// Нет четкого ответа, зависит от проекта и заказчика, как правило, что-то среднее

// как сборщик собирает компоненты в кучу? Как работает lazy в react(куда попадает, как загружается)
// webpack пробегается по всем импортам и получается дерево(App сверху, у App какие-то импорты и т.д)
// если компонента импортирована с помощью lazy, она не попадает в bundle и подгружается по мере необходимости

// react lazy/react suspense
// Для использования react lazy после всех импортов:
// const UsersContainer = React.lazy(() =>
//     import("./components/Users/UsersContainer") - используем именно функцию
// );
// А далее оборачиваем в Suspense <Routes></Routes>(при этом всё будет отрабатывать для каждой компоненты Route, которая импортируется через lazy, не затрагивая другие)
// Suspense - тревога ожидания - с помощью него мы задаём элемент, который будет отображаться, пока не подгрузиться lazy компонента
// Также нужно учитывать, что если не подгружается компонента, то и её вложенные компоненты не будут загружаться

// ошибка, которая может возникнуть при добавлении lazy загрузки(с импортами)
// Import in body of module; reorder to top - она возникает, когда пытаешься объявить переменную между импортами(а через lazy мы по сути объявляем переменные, поэтому их в конец)

// Как можно выложить fullstack(react+node.js) приложение бесплатно?
// с помощью сервиса render выкладываем node.js
// с помощью сервиса vercel/gh-pages выкладываем react приложение


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
