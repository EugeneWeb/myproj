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

// Добавил переход на регистрацию и авторизацию, useNavigate, useDispatch, componentDidUpdate(prevProps) важно про пропсы(отличие от componentDidMount), как сделать ререндеринг компоненты при переходе с /profile/:id на /profile 

// useNavigate - хук, который позволяет изменять url страницы без перезагрузки
// useDispatch - хук react-redux, позволяющий использовать функцию dispatch

// prevProps - объект с предыдущими значениями пропсов при вызове componentDidUpdate(нужны для того, чтобы не получать бесконечные циклы в componentDidUpdate)
// componentDidMount не имеет доступа к пропсам, componentDidUpdate- имеет 

// как сделать ререндеринг компоненты при переходе с /profile/:id на /profile
// componentDidUpdate(prevProps) {
//     if (this.props.isAuth !== prevProps.isAuth && this.props.isAuth) {
//         // Только если isAuth изменился с false на true
//         this.props.setUsersProfile(this.props.currentUser);
//       }
      
//     // Для того, чтобы при переходе с аккаунта другого user'а мы получили нашу страницу на '/profile' мы обновляем данные(т.е при переходе с /profile/skdfjkfd на /profile у нас будет происходить обновление данных)
//     if (prevProps.params.userId && !this.props.params.userId) {
//         this.props.setUsersProfile(this.props.currentUser);
//     }
// }


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
