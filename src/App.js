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


// Как обычно происходит взаимодействие между UI BLL DAL, axios.create, пропуск текущего пользователя во вкладке Поиск
// Обычно UI работает с BLL, а DAL  c BLL
// В нашем случае мы сделаем работу UI c DAL(который будет общаться с api) и UI с BLL
// Таким образом мы уберём логику работы с api из UI(классовые компоненты) и перенесём её в  DAL(single responsibility)
// также не забываем, что в UI данные про api(всё кроме resp.data) не нужно(в нашем случае) 

// С помощью axios.create можно создать instance axios, в который мы поместим baseUrl, headers, тем самым сократив код

// пропуск текущего пользователя во вкладке Поиск
// Для этого на сервере при find добавляев find({_id: {$ne: req.user.userDetailsId}}) для того, чтобы скипнуть текущего пользователя 

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
