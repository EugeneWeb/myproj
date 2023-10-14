import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";


import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Error from "./components/Error/Error";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import RegistrationContainer from "./components/Registration/RegistrationContainer";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { me } from "./redux/authReducer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import Preloader from "./components/common/Preloader/Preloader";
import { getIsInitialized } from "./redux/app-selectors";



//Что такое DOM подробно(+о js), virtual DOM(это, как работает), reconciliation, отличие html документа от html страницы, почему наша функция rerenderEntireTree плохая? Для чего нужен ключ c map?(+ пример)?
// DOM - document object model - объектная модель документа- совокупность объектов(просто объекты, которые получает браузер из тегов, каждый тег - это объект), которые получает браузер при парсинге html документа
// Потом по созданному браузером DOM дереву происходит визуализация элементов страницы
// С помощью js мы взаимодействуем с DOM деревом браузера, а не с html документом
// Каждое измение html страницы с помощью кода js заставляет браузер перерисовывать страницу, если js код написан неверно, это может значительно знизить эффективность перерисовки страницы

// virtual DOM(это, как работает), reconciliation
// virtual DOM(или виртуальный DOM) - это легковесное представление реального DOM, используется react для эффективного render'инга компонентов
// В случае с react, react берёт на себя работу с DOM, позволяет взаимодействовать с DOM браузера эффективно
// Как происходит работа virtual DOM
// Т.е когда происходит изменение state'а, а в дальнейшем перерисовка элемента, react компонента возвращает jsx код, который с помощью babel транспилирует его в js, из js кода создаётся новый virtual DOM - объектная модель документа react'а, новый virtual DOM сравнивается с предыдущем и если нет отличий, то react не производит перерисовку, если есть, то react изменяет только те элементы веб-страницы, которые были изменены в DOM'е браузера(точечное изменение DOM)
// Сравнение нового virtual DOM и старого virtual DOM называется reconciliation(рэкансильэйsh'эн)
// reconcilition - сравнение нового состояния virtual DOM со старым для того, чтобы определить какие изменения были внесены и произвести минимальное количество изменений с реальным DOM  

// т.е
// При ререндеринге компоненты происходит создание виртуального DOM именно для этой компоненты, далее React сравнивает предыдущее состояние virtial DOM для этой компоненты с новым virtual DOM, определяет какие части изменились и обновляет только эти части в реально DOM.
// Эффективность react заключается в том, что он способен точечно изменять virtual DOM для конкретной компоненты

// отличие html документа от html страницы
// Отличие заключается в том, что html документ - это текстовый файл, а html страница - это визуальное представление DOM(html документ - это статическое представление, а DOM - динамическое представление), созданного на основе html документа

// почему наша функция rerenderEntireTree плохая?
// Потому что данная функция вызывалась каждый раз, когда изменялось какое-либо значение и заставляла перерисовывать все элементы(на самом деле мы выяснили, что не все, так как происходит recancelation, но каждый раз возвращается ВЕСЬ jsx, и он ВЕСЬ транспилируется в js)

// Для чего нужен ключ c map?(+ пример)?
// Нужен для более эффективной работы со списками значений
// Например, у нас есть 
/* <ul>
    <li>first</li>
    <li>second</li>
</ul> */
// Если мы захотим добавить третий элемент в конец, то react поймёт, что элементы списка first и second остались неизменны и не станет их менять, просто добавит <li>third</li> в конец:
/* <ul>
    <li>first</li>
    <li>second</li>
    <li>third</li>
</ul> */
// Но если у нас есть, например, список имён, в который мы хотим в начало или на произвольную позицию добавить элемент, то react не поймёт, что какие-то элементы в списке остались неизменны и создаст новый список элементов, в который включит на нужную нам позицию новое имя и создаст заново неизменные элементы:
/* <ul>
    <li>John John</li>
    <li>Mark Mark</li>
</ul> */
// Перерисует все элементы
/* <ul>
    <li>Jack Jack</li>
    <li>John John</li>
    <li>Mark Mark</li>
</ul> */


function App(props) {
    const dispatch = useDispatch();

    useEffect(() => 
        () => {
            dispatch(me)
    }, [dispatch]);

    if(!props.isInitialized) return <Preloader />

    return (
        <Router>
            <div className={s.wrap}>
                <HeaderContainer />
                <NavBarContainer />
                <div className={s.content}>
                    <Routes>
                        <Route path="/" element={<ProfileContainer />} />
                        <Route path="/profile" element={<ProfileContainer />} />
                        <Route
                            path="/profile/:userId"
                            element={<ProfileContainer />}
                        />
                        <Route path="/news" element={<News />} />
                        <Route
                            path="/messages/*"
                            element={<DialogsContainer />}
                        />
                        <Route path="/music" element={<Music />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/users" element={<UsersContainer />} />
                        <Route path="/login" element={<LoginContainer />} />
                        <Route
                            path="/registration"
                            element={<RegistrationContainer />}
                        />

                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

const mapStateToProps = (state) => ({
    isInitialized: getIsInitialized(state)
})

export default connect(mapStateToProps, null)(App);
