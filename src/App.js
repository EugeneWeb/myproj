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


// Подключение redux, ошибки, call stack
// npm i redux

// Сейчас мы можем создать наш store одним методом
// createStore() - устарел, теперь называется legacy_createStore(вместо него использовать redux toolkit)

// Если мы имеем несколько reducers, то мы их должны объединить combineReducers({dialogsPage: dialogsReducer})
// Таким образом мы даём название dialogsPage для dialogsReducer(раньше мы именовали в state, теперь здесь)

// Далее
// legacy_createStore(reducers)

// меняем import в index.js на redux store

// Получим ошибку
// reducer с именем profilePage возвращает undefined
// ТО у нас при вызове reducer во время инициализации state ничему не равен, поэтому нужно проинициализировать state для каждого reducer
// Т.е мы помещаем данные на момент инициализации, а потом redux уже за нас производит работу со state'ом

// Нужно понимать, что store в redux содержит те же самые методы, какие есть у нас в самописном store, т.е: subscribe(callback), dispatch(action), getState()

// call stack - стэк вызовов, который отображается при использовании ключевого слова debugger внизу
// Стэк вызовов(filo first in last out)
// когда мы используем какие-то фреймворки у нас есть множество промежуточных вызовов, который мы можем отследить с call stack 
// Это может помощь при дебаге(вернуться в стэке вызовов на одну функцию)

// Главная проблема, которая может возникнуть связана с тем, что rerenderEntireTree принимает аргумент, но redux не передаёт этот аргумент, он просто вызывает ту callback функцию, которую мы передали в subscribe.
// Для решения этого мы должны в subscribe добавить callback, которая сама вызывает rerenderEntire tree, помещая в него обновленные данные из state 
/*
store.subscribe(() => {
  const state = store.getState()
  rerenderEntireTree(state)
})
*/

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
