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



// Контейнерная компонента vs Презентационная компонента

// По-прежнему наш UI зависит от Redux(BLL) и мы используем в нём метод dispatch(т.е мы в компоненте вызываем данный метод)
// В идеале же наш UI не должен иметь логику работы со store или с другими объектами
// UI должен просто получать в props'ах данные и callback'и, которые работают со store или другими объектами других библиотек
// Поэтому мы должны использовать контейнерные компоненты, чтобы наш элемент остался таким же чистым, таким же гибким, но реализация работы с store была вынесена из объекта
// Задача контейнерной компоненты в том, чтобы вернуть презентационную компоненту и предоставить ей данные и callback'и, которые будут иметь логику работы со store
// Контейнерная компонента - обертка для чистой презентационной компоненты, в которой происходит работа с состояниями приложения
// Контейнерная компонента берёт на себя грязную работу

// ТО мы создали чистую презентационную компоненту, которая никак не зависит от redux и может быть использована в других приложениях с другим способом state management


function App(props) {
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar navBarPage={props.state.navBarPage} />
                <div className={s.content}>
                    <Routes>
                        <Route path="/profile" element={<Profile profilePage={props.state.profilePage} store={props.store} />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/messages/*" element={<DialogsContainer dialogsPage={props.state.dialogsPage} store={props.store} />} />
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
