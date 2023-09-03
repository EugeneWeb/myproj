import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";

import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";

import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Error from "./components/Error/Error";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

// API first, base url, пагинация в mongoose(+пагинация в БД), зачем нужны || и &&

// API first - подход к разработке приложений, при котором первым делом создаются API, до UI и BLL

// Базовый URL - тот, к которому мы добавляем endpoint'ы и получаем полные url адреса:
// https://api.example.com/v1/
// Т.е базовый URL - начальная точка для доступа к ресурсам на веб-сайте

// пагинация в mongoose(+пагинация в БД)
// Пагинация в БД - порционное получение данных, с целью снижения нагрузки на server и БД
// Для пагинации в mongoose используем методы skip - для того, чтобы пропустить определенное кол-во странниц и limit для ограничения максимального количества данных, кот-ые мы можем получить на 1-ой странице

// зачем нужны || и &&
// (усл) && (значение, кот-е вернётся) заменяет(=) (усл) ? (значение, кот-е вернётся) : null
// (какое-то значение, напр req.query.perPage) || (значение по умолчанию) - если левое значение undefined, то возвращаем значение по умолчанию

function App(props) {
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar />
                <div className={s.content}>
                    <Routes>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/messages/*" element={<DialogsContainer />} />
                        <Route path="/music" element={<Music />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/users" element={<UsersContainer />} />

                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
