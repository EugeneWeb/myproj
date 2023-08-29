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

// Транспиляция это, Babel зачем нужен, Отличие BrowserRouter от HashRouter, как обычно начинается разработка react приложения, чем заменить Ref
// Транспиляция - преобразование одного кода в другой
// Babel - это транспилятор, который преобразует JSX код в JS код. Babel в React позволяет использовать самые новые возможности React, при этом написанный код будет транспилирован Babel таким образом, чтобы он поддерживался в старых браузерах

// Отличие BrowserRouter от HashRouter
// HashRouter использует Hash'и(якоря, например, #test или http://example.com/#/route) для изменения маршрутов, в отличие от BrowserRouter без проблем работает со старыми браузерами, которые не поддерживают History API HTML5
// BrowserRouter является современным подходом к разработке SPA приложений, использует History API HTML5, не использует хэши

// Ref можно заменить e.target или e.currentTarget


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
                        <Route path="/messages/*" element={<Dialogs dialogsPage={props.state.dialogsPage} dispatch={props.dispatch} />} />
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
