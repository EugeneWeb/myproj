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


// Объект store(проблема с контекст вызова методов), React, Redux - это ООП или функции?, дебаг чер window, перекл между функц в debugger, про локал setState в react, отл от redux
// store - хранилище данных
// ООП объект store представляет интерфейс взаимодействия с данными
// Объект store также существует в Redux

// проблема с контекстом вызова методов
// При передачи методов store у нас может возникнуть ошибка с this(контекстов вызова), в случае если мы передаём именно метод объекта, то нам нужно привязать к нему контекст вызова(Иначе у нас будет контекст вызова от props'ов, так как метод мы вызовем через пропсы и this будет самим объектом пропса):
// <Tag addPost={store.addPost.bind(store)}

// react - это функциональная библиотека, которая также содержит ООП(Redux тоже)
// Мы можем дебажить код(смотреть значения всех переменных какого-то объекта в конкретный момент времени) с помощью window, для этого в файл js добавляем 
// window.название = название 
// и теперь в консоли браузера мы можем написать в любой момент времени window.название и получить значение данной переменной

// Для того, чтобы переключаться между функциями: наводим на функцию+f11, для возвращения смотрим внизу на названия функций, в которые возвращаемся

// про локальный setState в react, отличие от redux
// В больших проектах setState неиспользуется, как правило state manegement'ом занимаются библиотеки управления состоянием в приложениях(или используется, но для маленькой работы по управлению состоянием какого-то компонента, для того, чтобы не нагружать лишний раз приложение)
// setState предоставляется react и предоставляет управление состояниями локально для компонентов по отдельности
// В нашем случае мы пишем свой redux, где пишем библиотеку управление состояния для всего приложения, а не для отдельного компонента
// Таким образом, если нам нужно следить за состояниями какого-то конкретного компонента, то мы можем обратиться к setState, но в случае, когда мы имеем дело с состояними всего приложения, то либо разрабатываем сами, либо используем одну из библиотек для управления состояний всего приложения: redux/mobx/...

function App(props) {
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar navBarPage={props.state.navBarPage} />
                <div className={s.content}>
                    <Routes>
                        <Route path="/profile" element={<Profile profilePage={props.state.profilePage} addPost={props.addPost} setNewPostText={props.setNewPostText} />} />
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
