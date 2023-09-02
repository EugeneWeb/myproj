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

// Убрали stateCopy в reducer'ах, как сделать копию массива и копию какого-то конкретного объекта в массиве одной строчкой? ошибка maximum update depth exceeded. Чему должен быть равен key, отличие spread от push, как вернуть в браузере на преды элем кот-ый был в фокусе? Почему мы в reducer'ах не создаём копию за switch case'ом? Как быстро открывать файлы по их имени в VS Code? Почему раньше нужно было импортировать react в функциональные компоненты? Фишка element в Route
// Как правило key равен id элемента, из которого мы получаем jsx(например, используем map с user'ами, key равен id user'ов)

// отличие spread от push
// Push используем, когда добавляем элемент в уже существующий массив
// Spread используем, когда нужно создать новый массив и добавить в него сразу элементы

// как вернуть в браузере на преды элем кот-ый был в фокусе?
// shift+tab

// Почему мы в reducer'ах не создаём копию за switch case'ом?
// Потому что если мы создаём копию за switch case'ом, то независимо от того подходит ли данный тип action нашему reducer'у у нас будет создаваться копия и будут тратиться лишние ресурсы

// Как быстро открывать файлы по их имени в VS Code?
// ctrl+p и можем писать название(расширение можем не писать, при этом необязательно в нек-ых случая писать даже полное название)

// Почему раньше нужно было импортировать react в функциональные компоненты?
// Раньше использовалась функция React.createElement(на более низком уровне) для создания компонентов jsx, с версии React 17 функция React.createElement перестала использоваться. В более ранних версиях(до 17) React.createElement компилятор JSX трансформировал элементы в вызовы React.createElement, для создания виртуальных элементов React.
// Сейчас jsx элементы компилируются напрямую в javascript

// Фишка element в Route
// Сейчас мы можем в тег element напрямую добавлять jsx(html) код

// как сделать копию массива и копию какого-то конкретного объекта в массиве одной строчкой? 
// С помощью map

// Пока функцию setUsers, которая должная брать данные из БД выносим за return и вызываем ёё при props.users.length === 0(это связано с тем, что если мы не добавим условий, то возникнет ошибка maximum update depth exceeded(бесконечный цикл, в котором всегда при отрисовке компоненты вызывается функция render и компонент снова отрисовывается и так по кругу))
 
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
