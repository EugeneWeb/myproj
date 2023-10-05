import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";


import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Error from "./components/Error/Error";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import RegistrationContainer from "./components/Registration/RegistrationContainer";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { me } from "./redux/authReducer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import Preloader from "./components/common/Preloader/Preloader";
import { getIsInitialized } from "./redux/app-selectors";

// Есть ли при использовании await альтернатива promise.all, как должен быть в идеале устроен редирект?, что такое селектор? Зачем нужны селекторы? Что такое рефакторинг кода? Как обычно делается поиск по пользователям? Большой минус селекторов. 3 главных проблемы селекторов, как решить, имена для селекторов, имена для thunk'ов(при конфликте с селекторами), где пишем селекторы, чем yarn лучше npm?


// нет, promise.all позволяет параллельно выполнять несколько ассинхронных запросов, в случае же с await мы можем выполнить их только последовательно

// как должен быть в идеале устроен редирект?
// В идеале redirect должен совершаться через state, т.е в state должно быть какое-то поле, кот-е отвечает за redirect и с кот-ым через dispatch происходит 'общение'

// что такое селектор?
// селектор- выборщик - это функция, кот-я делает выборку необходимых данных из state'а
//  это функция, кот-я возвращает определенную часть state'а, также помимо этого может иметь более сложную логику(например фильтрацию данных из state'а)
// Для каждой выборке нужно писать селектор

// Зачем нужны селекторы?
// С помощью селекторов мы добиваемся повторного использования кода, т.е если мы используем state.users.items несколько раз и нам понадобится это изменить, то нам придётся изменять это в каждом участке кода, в случае же с селекторами - это место расположения селекторов

// Что такое рефакторинг кода?
// рефакторинг кода - это изменение структуры или внешнего вида кода, при этом не изменяя его функциональности(с целью улучшения его сопровождаемости, читаемости, понимаемости)

// Как обычно делается поиск по пользователям?
// обычно при поиске в url-строку добавляются данные в query параметры:
// ?page=3&search=x

// Большой минус селекторов
// Большим минусом селекторов является то, что они вызываются всякий раз, когда происходит изменения ЛЮБЫХ данных в state'e(тех, кот-ые не относятся к конкретному селектору), если брать в расчёт простые селекторы, то это не большая проблема, но когда дело о сложных селекторах, кот-ые помимо выборки данных производят какие-то действия над данными из state'а, то это уже может быть весомой проблемой

// 3 главных проблемы селекторов, как решить
// 1. лишние перерисовки(так как данные изм-ся очень часто, то и перерисовки с повторными вызовами функций происходят очень часто)
// 2. множественный вызов функций(особенно критично со сложными функциями)
// 3. сложно дебажить(так как из-за перерисовки постоянно срабатывает debugger)

// Для решения этой проблемы используем библиотеку reselect
// npm i reselect
// reselect - библиотека, кот-я исп-ся для решения главных проблем при работе со сложными селекторами, т.е:
// reselect определяет те свойства state'а, от кот-ых зависит вызов какого-то селектора(reselect обычно исп-ся со сложными селекторами), библиотека reselect сама определяет, когда должен быть вызван селектор(вызов совершается, когда одна из зависимостей изменилась), reselect сам засчёт кэширования данных сохраняет результат выполнения селектора и в случае изменения зависимостей повторно вызывает селектор и повторно кэширует результат(если изменения не было, то просто возвращает закэшированный результат), ТО наша функция со сложной логикой вызывается только при изменении определенных зависимостей(а не всех зависимостей, кот-е находятся в mapStateToProps)
// const getUsersSuper = createSelector(getUsers(селектор, с помощью кот-го получаем данные в callback'е - примитивный селектор), (users) => {
    //действия с данными
//     return users
// })
// getUsersSuper - тест reselect'а
// При этом можем использовать как простые селекторы(имеется ввиду, кот-е объявленый до callback'а), так и сложные(при этом они все будут вызываться, только при изменений нужных им зависимостей)

// имена для селекторов, имена для thunk'ов(при конфликте с селекторами)
// имена пишем по тому, что мы берём из state'а, если берём пользователей, то getUsers(тогда thunk функцию называем requestUsers)

// где пишем селекторы
// селекторы пишем рядом с соответствующими reducer'ами, например, рядом с authReducer.js auth-selectors.js

// чем yarn лучше npm?
// Yarn произоводит установку пакетов в нескольких потоках(т.е многопоточная загрузка)

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => 
        () => {
            dispatch(me)
    }, [dispatch]);

    if(!props.isInitialized) return <Preloader />

    return (
        <Router>
            <div className={s.wrap}>
                <HeaderContainer />
                <NavBarContainer />
                <div className={s.content}>
                    <Routes>
                        <Route path="/" element={<ProfileContainer />} />
                        <Route path="/profile" element={<ProfileContainer />} />
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
                </div>
            </div>
        </Router>
    );
}

const mapStateToProps = (state) => ({
    isInitialized: getIsInitialized(state)
})

export default connect(mapStateToProps, null)(App);
