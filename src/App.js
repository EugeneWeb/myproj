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

// Добавления сервера в React приложение(client-server separation), как обычно создаются UI с API, значение DAL, ВАЖНО ПРО AXIOS
// Для добавления сервера просто отдельно создаём node.js приложение, с помощью которого будем обрабатывать соответствующие route'ы и отправлять данные на React
// client-server separation - подход, при котором бэкэнд и frontend разделены
// Далее запускаем React и node.js одновременно - получаем полноценное приложение с отдельной backend и frontend частью

// как обычно создаются UI с API, значение DAL
// Обычно UI создают под конкретное API(т.е свойства в UI берут по названиям, такие же, какие приходят с API)
// или же делают прослойку в виде DAL, который превращает данные в тот формат, который нужен

// ВАЖНО ПРО AXIOS
// для работы с axios на backend'е нужно скачать пакет cors 
// npm i cors
// const cors = require('cors')
// app.use(cors)
// Таким образом мы исключим ошибки при обращении frontend'а к backend'у(когда backend и frontend лежат на разных портах, могут возникать cors ошибки)

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
