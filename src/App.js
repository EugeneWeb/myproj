import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";

import NavBar from "./components/NavBar/NavBar";

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
import { useDispatch } from "react-redux";
import { authAPI } from "./api/api";

import { setUser } from "./redux/authReducer";

// Стоит ли использовать локальные state'ы(или только глобальные), чем лучше заменить тернарный оператор, проблема локальные state'ов, как делать шаги в debugger с помощью комб клавиш, что происходит при передачи объекта в setState?(перезаписывается ли весь объект setState), что будет если до и после this.setState написать console.log?

// Стоит ли использовать локальные state'ы(или только глобальные)
// стоит использовать и те, и те, зачастую локальные state'ы используются в тех местах, где использование глобальных state'ов избыточно(status(режим отображения или редактирования), раскрыто меню или нет, hover эффект), когда всему state'у необязательно знать про такой незначительный момент

// чем лучше заменить тернарный оператор
// Для более понятного синтаксиса
// используем
// {!var &&}
// {var &&}

// проблема локальные state'ов
// Главное проблема в том, что общие данные нужно прокидывать через пропсы

// как делать шаги в debugger с помощью комб клавиш
// fn + f10

// что происходит при передачи объекта в setState?(перезаписывается ли весь объект setState)
// Нет не перезаписывается, изменяется только та часть, которую мы передаём(происходит слияние объектов)

// что будет если до и после this.setState написать console.log?
// Будут выведены 2 старых значения, так как this.setState - ассинхронная функция

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => 
        async () => {
            try {
                
                const resp = await authAPI.me();
                
                dispatch(setUser(resp.user));
            } catch (error) {
                console.log(error);
                localStorage.removeItem("token");
            };
    }, [dispatch]);

    return (
        <Router>
            <div className={s.wrap}>
                <HeaderContainer />
                <NavBar />
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

export default App;
