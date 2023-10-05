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


// Проблема при обновлении страницы в браузере нашего приложения, Как добиться правильного app initialization



// Проблема при обновлении страницы в браузере нашего приложения
// При обновлении страницы, т.к мы не авторизованы, нас сначало redirect'ит в /login далее мы получаем ответ от authAPI.me()(т.е изменяется значение isAuth, что вызывает повторный render компоненты) и после авторизации нас redirect'ит на /profile, ТО при обновлении страницы, независимо от того, где мы располагаемся, нас будет redirect'ить на /profile

// Как добиться правильного app initialization
// Для этого сначало создаем appReducer, кот-ый будет содержать поле isInitialized
// Создаём AC setInitialized
// Далее в thunk me просто используем то, что любая функция dispatch возвращает promise, дожидаемся с помощью await выполнения всех dispatch нужных для инициализации приложения, и только после этого dispatch(setInitialized)(при чём в try и catch, т.е 2 раза)
// Прокидываем в пропсы isInitialized и при не isInitialized показываем Preloader
// ТО мы получим, что при обновлении страницы мы будем оказываться на той странице, с кот-ой мы обновляем приложение

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
    isInitialized:state.app.isInitialized
})

export default connect(mapStateToProps, null)(App);
