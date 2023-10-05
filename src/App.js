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

// Почему раньше нельзя было использовать методы жизненного цикла, стэйты и т.д в функциональных компонентах, как это происходит сейчас, что возвращает useState, как работает useState, useEffect, имитация componentDidMount с useEffect(стоит ли), где нельзя использовать хуки
// Раньше для методов жизненного цикла и локального state'а использовались классовые компоненты(так как создавались экземпляры класса и в этой памяти можно было хранить данные и работать с ними, вызывая нужные методы), с функциональными же компонентами такое нельзя было сделать, так как они вызывались, возвращали значение и всё
// С развитием react выбрал направление в сторону функций и функционального программирования и создал хуки
// хуки позволяют хранить данные для функциональных компонент на стороне react'а(т.е все данные в state'е хранятся в react, в отличие от тех же классовых компонент)
// т.е когда мы вызываем функциональную компоненту с хуками, react хранит данные о вызове хуков и остальные данные

// что возвращает useState
// useState возвращает массив, первый элемент кот-го является значение state'а, а вторым сеттер для этого state'а
// отсюда и получается такая запись(деструктуризация массива):
// const [name, setName] = useState('')

// как работает useState, useEffect
// React запоминает(сохраняет данные об этом), что при вызове этой функции он хранит данные и для изменения этих данных react также возвращает функцию, кот-я находится в react, на стороне этих данных

// useEffect() - функция, с помощью кот-й react вызывает переданный в неё колбэк после отрисовки компоненты всякий раз, когда изменяются зависимости(т.е вторым аргументов мы передаём массив зависимостей, при изменении кот-ых будет вызвана функция useEffect, если сравнивать с функциональной компонентой, то зависимость [props.status] эквивалентна записи в componentDidUpdate: if(prevProps.status !== this.props.status), хотя не стоит сравнивать хуки и методы жизненного цикла, потому что они имеют совсем другой смысл)
// В случае с profileStatus 

// имитация componentDidMount с useEffect(стоит ли)
// для этого просто передаём вторым аргументов пустой массив зависимостей [], тогда колбэк, переданный в useEffect вызовется лишь 1 раз:
// useEffect(() => {}, []) - на самом деле не стоит так делать, потому что, как правило, даже в таких случаях нужно искать зависимости, useEffect без зависимостей, как правило, не используется

// где нельзя использовать хуки
// Хуки нельзя использовать в условиях и в циклах

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
