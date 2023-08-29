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

// Store это, зачем нужен reducer, как включить автозаполнение
// Store - это объект, который управляет изменением state'а c помощью методов

// Так как в данный момент у нас метод dispatch очень большой и с разрастанием объекта state, он будет разрастаться тоже, то лучше делигировать его логику другим функциям, а именно reducer'ам
// Если в функциональном программировании у нас есть большая функция, то мы её дробим на несколько маленьких
// Reducer - это функция, которая принимает составную часть state'а и объект action и возвращает новый state(необязательно)
// Определение: reducer- это чистая функция, которая принимает state и action? если нужно, этот action применяет к state'у и возвращает новый state, либо же неизменненный старый state(не изменяет, если action не подошёл)
// Важный момент: action приходит один, но так как store не знает какому конкретно reducer'у он нужен, он передаёт его всем reducer'ам и ТО мы по частям изменяем state
// Но тогда есть вопрос: как dispatch будет
// ТО наша функция dispatch будет делегировать изменение state'а reducer'ам(вызывать их), они будут изменять составные части state'а(необязательно) 

// Упрощенный вид reducer
// reducer1(action, state) {
// ...
//     return changedState
// }

// Обычно reducer'ов создаём столько же, сколько частей в state

// как включить автозаполнение
// ctrl + пробел

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
