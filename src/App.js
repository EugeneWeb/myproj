import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";

import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";

import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Dialogs from "./components/Dialogs/Dialogs";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Error from "./components/Error/Error";


// Рефакторинг прил, испр ошибок в UI(action creator, action type), констант в чист функциях, отл модулей от обыч js файл
// Наше приложение по-прежнему имеет недостаток: UI отвечает за создание объектов action, что увеличивает вероятность того, что мы сделаем ошибку и нарушает принцип SOLID single responsibility. Нам нужно делегировать данное действие(формирование объекта) BLL, потому что action нужен BLL.
// Делегируем создание объектов на функции, объявленные в BLL action creator(т.е action creator - это функция, которая возвращает объект action)
// Action creator имеют разные названия для разных событий, их мы можем импортировать в компоненты напрямую, так как они не содержат какую-либо логику, а просто помогают правильно формировать объекты
// Action type - также константы, которые представляют из себя названия типов в BLL лучше вынести наверх в BLL, тем самым уменьшив вероятность совершения ошибки

// константы в чистых функциях, в BLL мы вынесли Action type'ы в отдельные константы и используем их в dispatch, но это не нарушает принцип чистых функций, так это просто строковые литералы, которые никак не влияют на поведение данной функции

// отл модулей от обыч js файл
// Главное отличие - это область видимости - переменные, которые объявлены в модуля без экспорта не могут быть видимы в других файлах

function App(props) {
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar navBarPage={props.state.navBarPage} />
                <div className={s.content}>
                    <Routes>
                        <Route path="/profile" element={<Profile profilePage={props.state.profilePage} dispatch={props.dispatch} />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/messages/*" element={<Dialogs dialogsPage={props.state.dialogsPage} />} />
                        <Route path="/music" element={<Music />} />
                        <Route path="/settings" element={<Settings />} />

                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
