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
import axios from "axios";

import { setUser } from "./redux/authReducer";

// Добавил follow, unfollow, убрал текущего пользователя из списка пользователей, про правильное использование методов POST, GET, PUT, DELETE, PATCH в axios с headers, данные, которые можно посмотреть в network, credentials(перевод), метод OPTIONS

// Теперь мы через authReducer изменяем данные о массиве following в currentUser и отрисовываем всех пользователей

// про правильное использование методов POST, GET, PUT, DELETE, PATCH в axios с headers
// при добавлении headers в POST, PUT, PATCH нужно добавлять пустой объект с телом, поэтому будет 3 аргумента, с delete и get - 2

// данные, которые можно посмотреть в network
// accept(принимаемый тип данных)
// origin(домен, с которого отправляем запрос)
// referrer(с какой страницы отправляем запрос)
// user Agent(браузер)

// Если посмотрим response, то увидим cors(политика безопасности)
// (access-control-...-...(какой порт) и т.д)
// cache-contol: no-cache(не кэшируем ответ)

// credentials(реквизиты для входа)

// OPTIONS
// Перед самим запросом браузер шлёт запрос preflight с методом OPTIONS для того, чтобы узнать о доступе(получает все заголовки)
// Метод OPTIONS возвращает данные о cors(доступные методы, разрешенные заголовки и т.д)

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => 
        async () => {
            try {
                const resp = await axios.post(
                    "http://127.0.0.1:5000/api/user/auth",
                    {},
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );
                  
                dispatch(setUser(resp.data.user));
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
