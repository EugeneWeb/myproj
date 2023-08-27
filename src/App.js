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


// Архитект прил. BLL, DAL, UI трехслойная архитект прил, single responsibility, index.js отделение UI от BLL

// Слой(layer) - набор файлов, функций и т.д, который имеет свою определенную ответственность

// BLL - это слой бизнез логики в архитектуре приложения. 
// это Концепция, разделяющая приложение на слои, каждый из которых имеет свою определенную ответсвенность
// это архитектурная концепция, в рамках трехслойной архитектуры приложения.

// Т.е существует трехлойная архитектура приложения(Three Tier Architecture), в которой есть слой BLL
// Преимущества:
// Разделение обязанностей - по SOLID принципу single responsibility - одна отвественность, меньше ошибок
// Повторное использование 
// Гибкость - возможность использония независимо от UI и DAL

// DAL - data access layer - слой, на котором происходит взаимодействие с БД/сервером, например API, которое делает запрос в БД или сохраняет данные на сервер

// Бывает, что DAL являются частью BLL, являются одним слоем(как здесь)

// UI - user interface(React) отвечает за отрисовку компонентов(интерфейс для взаимодействия с данными)
// BLL(внутри DAL - слой, который отвечает за хранение данных(Redux)

// Что-то похожее на MVC, т.е views - ui, models+взаимодействие с БД - DAL, controllers(используем DAL в контроллерах) - BLL, также 3 слоя

// Т.е Данные в UI приходят не с сервера, а через некоторую абстракцию
// В зависимости от переданных данных c Redux, мы по-разному отрисовываем компоненты, передавая данные в props'ы
// Получается, то, что мы храним данные в UI - ошибка, так как нарушаем главное правило программирования single responsibility - компонента отвечает не только за отрисовку интерфейса, но и за хранение данных, ТО нужно вынести из компонентов данные
// Данные выносим в index.js - файл, который не является частью UI
// Для того, чтобы, например компонент MyPosts получил данные, мы передаём их сначало через app в props'ы потом также в profile и так до пункта назначения
// Данные(redux) и UI(react) обладают примерно одинаковым уровнем важности, так как пользователю нужны не только данные, но и удобный инструмент взаимодействия с данными


function App(props) {
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar />
                <div className={s.content}>
                    <Routes>
                        <Route path="/" element={<Profile />} />
                        <Route path="/profile" element={<Profile images={props.images}/>} />
                        <Route path="/news" element={<News />} />
                        <Route path="/messages/*" element={<Dialogs dialogs={props.dialogs} messages={props.messages} />} />
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
