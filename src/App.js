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

// SOAP, REST, отличия SOAP и REST, RESTful сервисы, server API, endpoint, являются ли классовые и функциональные компоненты репрезентационными? Является ли нарушением чистых функций использования обработчиков событий(функций, кот-ые вып-ся при событии). Как происходит отрисовка классовой компоненты. Что мы получаем от наследования React.Component? Где нужно делать side effect(ajax запросы, setTimeout, в том числе работа с DOM(хоть так и не нужно делать))? Сколько раз в DOM добавляется классовый компонент, сколько раз вызывается метод componentDidMount?
// Подкл axios

// SOAP - simple object access protocol - это протокол обмена данными между клиентом и сервером, в котором данные передаются в XML формате, раньше, до архитектурного стиля REST пользовался популярностью.
// Со временем такой подход изжил себя(так как приходилось создавать разные Endpoint'ы для различных операций, например, для того, чтобы создать API для добавления, удаления, редактирования и получения пользователей нужно было создать 4 url адреса(Endpoint'а))
// ПРОТОКОЛ://ХОСТ/api/users/create - POST
// ПРОТОКОЛ://ХОСТ/api/users/get - GET
// ПРОТОКОЛ://ХОСТ/api/users/update - POST
// ПРОТОКОЛ://ХОСТ/api/users/delete - POST
// )
// Сейчас как SOAP, так и fetch поддерживают использование всех 4 методов запросов и такая задача решается одним url адресом:
// ПРОТОКОЛ://ХОСТ/api/users/  - GET, POST, PUT, PATCH, DELETE

// REST - representational state transfer(передача состояния - означает, что клиент может переходить между состояними приложения, изменяя ресурсы на сервере с помощью HTTP методов) - архитектурный стиль, основной идеей которого представление данных в виде ресурсов(документ, изображение и т.д), каждый ресурс имеет уникальный идентификатор URI(uniform recource identifier, включает в себя URL), REST использует стандартные HTTP методы: GET, POST, PUT, DELETE, стандартные коды состояний HTTP, данные представляются в разных форматах: JSON, XML, HTML

// RESTful сервисы - сервисы, которые используют архитектурный стиль REST 

// отличия SOAP и REST
// SOAP не использует HTTP методы напрямую, как REST, все методы SOAP являются HTTP POST запросами, в тела, которых помещается информация о запросе(т.е SOAP имитирует использование все HTTP методов), поэтому нужно вместо одного url адреса в REST создавать 4 url адреса SOAP
// REST использует для обмена данными XML формат, REST же использует различные форматы данных: JSON, XML, HTML и др.

// server API
// Это общее понятие интерфейса сервера для взаимодействия с клиентом, может включать в себя как REST API, так и SOAP

// Endpoint
// Endpoint(точка доступа) - это URL адрес, по которому клиенты могут отправлять HTTP запросы на сервер для выполнения определенных операций(Т.е server API это набор endpoint'ов)

// Являются ли классовые и функциональные компоненты репрезентационными?
// Нет, не обязательно, как классовые, так и функциональные компоненты могут быть как репрезентационным, так и контейнерными компонентами

// Является ли нарушением чистых функций использования обработчиков событий(функций, кот-ые вып-ся при событии)
// Функции, кот-ые вызываются при каком-то событии, не считаются за side effects, хоть и любые события это ассинхронные действия, но они происходят после отрисовки компонента(поэтому мы можем даже добавить взаимодействие с сервером на кнопку, но так не делают) 

// Как происходит отрисовка классовой компоненты.
// Перед отрисовкой классовой компоненты создаётся экземпляр данного класса и уже все последующие отрисовки элемента(вызовы метода render) происходят через этот единственный экземпляр(т.е создается 1 экземпляр и методы вызываются у него одного)

// Что мы получаем от наследования React.Component?
// Методы жизненного цикла, пропсы, setState

// Где нужно делать side effect(ajax запросы, setTimeout, в том числе работа с DOM(хоть так и не нужно делать))
// В componentDidMount, так как мы уже точно знаем, что наша компонента была добавлена в DOM и мы уже можем работать с DOM

// Сколько раз в DOM добавляется классовый компонент, сколько раз вызывается метод componentDidMount?
// 1 раз, если роутинг, то несколько


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
