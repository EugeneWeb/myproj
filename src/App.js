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

// Как делался редирект раньше и сейчас, HOC это, почему нам нужно использовать HOC, как выглядит HOC, как чаще всего именуются HOC, стоит ли передавать что-то кроме компоненты в HOC, откуда лучше брать данные для пропсов, для чего нужна функция compose, как устроена функция connect,HOC hell
// Раньше <Redirect to />
// Сейчас <Navigate to />

// HOC это
// High order component - компонента высшего порядка(это функция, которая принимает компоненту, и возвращает контейнерную компоненту), позволяет создавать однообразные контейнерные компоненты

// почему нам нужно использовать HOC
// Потому что если мы будем везде писать if(!props.isAuth)<Navig...., то это дублирование кода + нарушение single responsibility принципа(компонента помимо отрисовки выполняет редирект, работу с url), для того, чтобы избавиться от дублирования кода используем HOC, которая будет внутри работать с connect, получать props.isAuth и делать проверку для редиректа

// как выглядит HOC
// const HOC = (component) => {
    // const wrapperContainerComponent = (props) => <Component />
    // return wrapperContainerComponent
// }

// как чаще всего именуются HOC
// C with

// стоит ли передавать что-то кроме компоненты в HOC, откуда лучше брать данные для пропсов
// Лучше всего, когда HOC сама снабжает себя нужными данными с помощью функции connect, ТО нам не нужно думать о том, чтобы постоянно передавать какие-то доп.данные в HOC

// для чего нужна функция compose, как устроена функция connect,HOC hell
// Функция compose нужна для того, чтобы вызывать последовательно функции, результат которой ожидает следующая функция, т.е compose вызывает последовательно сверху-вниз HOC, и сама передаёт результат нижней функции в качестве аргумента при вызове верхней функции
// сonnect после первого вызова возвращает HOC, в который мы передаём компоненту при втором вызове
// С помощью compose можно легко добавлять новые HOC'и без необходимости вкладывать функции друг в друга(избавляемся от вложенности HOC'ов друг в друга)
// HOC hell(callback hell) - когда происходит множественная передача одних в HOC'ов в другие, что усложняет чтение, для решения - compose

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
