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

// Element vs render vs component(Router v6), Объект state, как дебажить ошибку в пропсах, чистые функции(зачем импортировать объект state именно в index.js), POCO/POJO
// Раньше для добавления props'ов в тегах Route нужно было использовать тег render или component c передачей функции в атрибут:
{/* <Route path="/profile" render={() => <Profile images={props.images}/>} /> */}
// или
{/* <Route path="/profile" component={() => <Profile images={props.images}/>} /> */}
// Это возможно, потому что функциональный компонент - это функция, возвращающая JSX код(прямо как в этом случае)

// Теперь все данные будем хранить в объекте state, который будет содержать данные для каждой страницы(profilePage, DialogsPage) и доп. данные (sidebar), общие для всех компонентов(используются не только в одном компоненте)

// как дебажить ошибку в пропсах
// Для дебага ошибки используем в компоненте объект debugger и с помощью него мы можем вызвать debugger кода на этом участке кода в браузере+ можно просматривать значения переменных в браузере

// чистые функции(зачем импортировать объект state именно в index.js)
// Чистые функции - это концепция функционального программирования.
// Это функции, которые обладаются определенными свойствами, что делает их предсказуемыми, легко тестируемые и неизменяемые при одинаковых входных данных.
// Свойства:
// Возвращает одинаковый результат для одинаковых входных данных
// Не изменяет состояние программы вне своей области действия: т.е не влияет на глобальные переменные, не выполняет запись в файл, не взаимодействует с БД
// Код в чистых функциях изолирован от изменений в других частях кода

// Простое определение
// Чистая функция - это изолированная функция, которая не содержит глобальные переменные, они принимают данные исключительно из аргументов, что делает её более предсказуемой, легко тестируемой, неизменяемые при одинаковых входных данных

// При функциональном программировании все функции стараемся далать чистыми!!!!!!!
// Исходя из этого мы можем сделать вывод, что импорт данных из state - неправильно, для того, чтобы наши функции были чистыми, мы должны state передать в виде props'ов!!! В ФУНКЦИЯ ДОЛЖНЫ БЫТЬ ТОЛЬКО АРГУМЕНТЫ. ВОЗРАЩАЕМАЯ РАЗМЕТКА ДОЛЖНА ЗАВИСЕТЬ ТОЛЬКО ОТ ПАРАМЕТРОВ - props

// POCO/POJO
// POCO - Plain Old CLR Object
// POJO - Plain Old Java Object
// В js - это обычный объект, который мы используем без использования классов: { key1: 'value1' }

function App(props) {
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar navBarPage={props.state.navBarPage} />
                <div className={s.content}>
                    <Routes>
                        {/* Также важно страницам передать все их данные т.е в profile добавляем profilePage, dialogs добавляем dialogsPage */}
                        <Route path="/profile" element={<Profile profilePage={props.state.profilePage}/>} />
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
