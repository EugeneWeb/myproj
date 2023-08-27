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


// Переход меж стр комб клавиш, exact, camelCase + CSS MODULES, map на более низком уровне
// alt + стрелки
// Раньше везде надо было ставить exact для строгого определения url, сейчас это по умолчанию
// Чтобы сделать старое поведение по умолчанию используем /path/*
// Лучше использовать camelCase вместе с CSS модулями

// map на более низком уровне
// Компилятор react может обрабатывать массивы из jsx кодов:
// ТО запись [<Header />, <Header />, <Header />]
// равнозначна
// <Header /> <Header /> <Header />
// Поэтому есть возможность использовать .map внутри jsx

function App() {
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar />
                <div className={s.content}>
                    <Routes>
                        <Route path="/" element={<Profile />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/messages/*" element={<Dialogs />} />
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
