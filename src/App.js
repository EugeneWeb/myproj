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


// Рефакторинг методов в store: dispatch, action. как наз-ся обыч компоненты, кот-е мы исп? Мож ли исп ключ слово debugger в обыч js? Др спос дебага без debugger
// Способ добавления множества методов в объект store и передача их в атрибуты app(при увеличении объекта state увеличивается и количество методов) довольно не удобный подход, так как каждый раз нам приходится добавлять эти все методы в app и прокидывать их через пропсы до нужного места, более логичным будет использование общего метода dispatch.(dispatch - отправить)
// Но тогда как определять какое действие выполнять в dispatch?
// Для этого мы будем передавать в качестве аргумента объект action, который обязательно содержит свойство type(название события заглавными буквами, слова разделяем через тире). Для передачи данных будем просто для каждого действия передавать нужные для этого действия свойства: т.е для каждого действия разные свойства, например для 
// т.е мы отправляем(dispatch) объект с информацией о действии(action) в BLL
// Теперь в компоненту входят не только данные, но и колбэки для взаимодействия с внешним миром

// как называются обычные компоненты, которые мы используем?
// stateless компоненты, т.е компоненты, которые не меняют своё состояние, данные приходят извне и она не меняет состояние внутри себя, а вызывает callback'и для изменения чего-то снаружи

// Мож ли исп ключ слово debugger в обыч js?
// Да, можно

// Другой способ дебага без debugger
// Другой способ заключается в том, чтобы открыть в браузере js файл(или если он открыт в браузере) и поставить точку остановы

// action - это объект, который мы передаём в dispatch. Dispatch - метод store, с помощью которого происходит изменение данных в state

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
