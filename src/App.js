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

// Проблема с flex
// width и height у flex-элементов(которые находятся в flex-контейнере) могут отображаться не правильно, если не добавлять flex: 1 1; каждому элементу для сохранения пропорциональности при изменении размеров

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
                        <Route path="/messages" element={<Dialogs />} />
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
