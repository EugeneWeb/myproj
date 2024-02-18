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
import { getIsAuth } from "./redux/auth-selectors";

// Добавления расширения redux devtools, для чего нужен, что такое браузерные расширения, Тест компонент(ошибка с axios, рендер App компоненты, что нужно для тестирования компоненты, Как сделать группы тестов, Библиотека для тестирования react компонентов(что использовать вместо неё))
// нужен для того, чтобы отслеживать изменения state'а, отправленные action'ы, изменения(diff)
// С помощью jump можем отматывать на предыдущие состояния state'а и в связке с react developer tools смотреть изменения пропсов и state'ов

// Заходим в документацию, находим advanced store setup(так как используем middleware)
// глобальный window.store можем убрать
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

// что такое браузерные расширения
// Браузерные расширения - это js код, который может присоединяться к странице и брать из неё информацию, работает как js, который был подключен со стороны(нужно скачивать с умом, так как могут воровать персональные данные)
// javascript код, которому мы разрешили выполняться на любой нашей странице(+ иногда ещё html/css)
// имеют доступ к DOM и другим данным(пользователь выбирает сам какие данные может изменять то или иное расширение)


// Тест компонент(ошибка с axios, рендер App компоненты, что нужно для тестирования компоненты)
// Для того, чтобы исправить ошибку с axios добавляем в конец в package.json:
// "jest": {
//     "moduleNameMapper": {
//       "axios": "axios/dist/node/axios.cjs"
//     }
//   }
// Так как рендер App компоненты требует объект Store, который мы получаем с помощью контекста через Provider, мы создаём новую компоненту AppContainer, кот-я включает Provider и App, тестируем AppContainer компоненту на рендер 

// что нужно для тестирования компоненты
// Для тестирования компоненты нам нужно её отрендерить и посмотреть значения пропсов/внутренние элементы

// Как сделать группы тестов
// describe('dsf',(arguments) => {
//     it('', (arguments) => {
        
//     })  
// })

// Библиотека для тестирования react компонентов
// npm i -D react-test-renderer@версия react - данная библиотека позволяет рендерить(преобразовывать) компоненты в нативные js объекты
// Библиотека устарела, вместо неё используется react-testing-library

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => 
        () => {
            dispatch(me)
    }, [dispatch]);

    if(!props.isInitialized) return <Preloader />

    return (
        <Router>
            <div className={props.isAuth ? s.wrapAuth : s.wrapNotAuth}>
                <HeaderContainer notAuthClassName={s.header} />
                {props.isAuth && <NavBarContainer />}
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
    isInitialized: getIsInitialized(state),
    isAuth: getIsAuth(state)
})

export default connect(mapStateToProps, null)(App);
