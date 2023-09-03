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

// Является ли классовая компонента users контейнерной компонентой, изменение кода, добавление preloader(isFetching)
// Так как классовая компонента содержит запросы к серверу, то она является контейнерной компонентой
// Нам нужно разделить логику UI и BLL для возможности переиспользования данного UI
// Для этого мы создаем презентационную компоненту Users, в которую через callback'и передаём все данные из классовой компоненты
// ТО мы получаем 2 контейнерных компоненты: одна для взаимодействия с react-redux, другая для взаимодействия с api сервера

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
