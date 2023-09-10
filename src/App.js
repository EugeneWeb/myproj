import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";

import NavBar from "./components/NavBar/NavBar";

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
import { useDispatch } from "react-redux";
import { authAPI } from "./api/api";

import { setUser } from "./redux/authReducer";

// как убрать ошибку, когда сервер падает после того, как токен становится не действительным, для чего нам нужно изменить Server -DAL - UI - BLL, Почему мы начали делать ассинхронные запросы в ui компоненте, пример с preloader и addMessage, thunk функция это, для чего нужен redux-thunk, redux-thunk это, как работает, как снабдить данными thunk функции(зачем), перевод middleware, как подключить redux-thunk, Где добавлять thunk creator'ы, который возвращают thunk функции
// Для этого просто в jwt.verify(token, (err, user) => {if(err){}}) 2-ым аргументом добавляем колбэк, который будет обрабатывать ошибку, когда токен становится недействительным

// для чего нам нужно изменить Server -DAL - UI - BLL
// При таком подходе, когда у нас происходит взаимодействие с DAL и server на стороне UI, ui становится посредником между BLL и DAL(берёт ответственность на себя, нарушает принцип single responsibility), ТО ui, который просто должен принимать данные с BLL и отрисовывать их начинает становится центровой фигурой, берущей на себя ответственность менеджера(которую должен брать на себя BLL), поэтому идеальная архитектура:
// UI - BLL - DAL - server, таким образом центровой фигурой, через которую происходит получение данных является BLL, которая снабжает данными UI, а UI занимает одним делом: оповещает BLL(с помощью dispatch) о намерениях пользователя(получить пользователей и т.д)

// Почему мы начали делать ассинхронные запросы в ui компоненте
// Было бы неплохо в BLL получать из UI намерение пользователя и посылать ассинхронные запросы в reducer'ах, НО так как reducer'ы - это чистые функции, которые должны возвращать state как можно быстрее и синхронно, то в reducer'ах нам этого не сделать, поэтому изначально мы вынесли эту логику в UI компоненту

// пример с preloader и addMessage
// В случае с addMessage нам нужно для того, чтобы добавить на ui preloader и добавить сообщение, нам нужно сделать 3 action'а и отправить(dispatch) их в BLL, получаем 3 action'а, связанных между собой, + работа с api, можем объединить их вместе в одну функцию(функция, которая работает с api и отправляет action'ы)

// thunk функция это, для чего нужен redux-thunk, redux-thunk это, как работает
// thunk это - функция которая работает с api(выполняет ассинхронную операцию) и отправляет(dispatch) action'ы.
// redux-thunk как раз и нужен для того, чтобы уметь работать с thunk функциями(потому, что обычный store.dispatch может работать только с action, а не функиями)
// redux-thunk это middleware(промежуточное ПО), которое позволяет работать с функциями с помощью метода store.dispatch
// ТО через store.dispatch(если это обычный action) action попадает в thunk MW(middleware) и из thunk MW action передаётся reducer'ам
// если через store.dispatch мы отправляем функцию, то thunk MW запустит эту функцию, вызовет store.dispatch и потом обычные action'ы снова по кругу проидут через thunk MW, thunk MW определит, что это обычный action и отправит по reducer'ам, если в redux функции, которая будет вызываться через thunk MW будет отправляться опять функция thunk, то будет выполнены все те же самые операции по кругу, пока не будут отправлены в thunk MW обычные action'ы


// как снабдить данными thunk функции(зачем), перевод middleware
// Для этого используем замыкания: будем поверх thunk делать функцию родителя, которая будет возвращать thunk функцию, ТО мы снабдим данными thunk функцию, которая вызовется с помощью thunk MW(мы это делаем, потому что thunk функция будет вызвана внутри thunk MW и thunk MW не сможет при вызове передать нужные данные в виде аргументов, thunk принимает в качестве аргумента исключительно dispatch)
// перевод middleware - середина провода

// как подключить redux-thunk
// npm i redux-thunk
// legacy_createStore(reducers, applyMiddleware(thunk))

// Где добавлять thunk creator'ы, который возвращают thunk функции 
// В reducer'ы 

// Теперь в ui мы просто имеем намерение пользователя(функции getUsers и т.д) без работы с запросами и store.dispatch

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => 
        async () => {
            try {
                
                const resp = await authAPI.me();
                
                dispatch(setUser(resp.user));
            } catch (error) {
                console.log(error);
                localStorage.removeItem("token");
            };
    }, [dispatch]);

    return (
        <Router>
            <div className={s.wrap}>
                <HeaderContainer />
                <NavBar />
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

export default App;
