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

import { me } from "./redux/authReducer";

// Вынес логик авторизации в thunk me, Способы обновления проекта(как правильно обновлять проекты, какие бывают версии), как дебажить без debugger, backword compatibility, как посмотреть версию babel, как синхронизировать локальный state и глобальный state


// Способы обновления проекта(как правильно обновлять проекты)
// Перед переходом на новой версию первым делом стоит определиться с какой версии на какую переходим:
// 16(мажорная версия, значительные изменения).15(минорная версия).1(патч, как правило, исправление ошибок)
// также в package.json могут находиться версии вида ^16.15.1(означает, что при использовании npm i будут установлена максимум мажорная версия 16 и минорная + патч версии могут быть установлены выше, чем указано в package.json, если таковые есть, обновление минорных и патч версий) или ~16.15.1 (обновление только патч версий)
// Перед переходом на новую версию стоит грамотно оценить изменения, которые потребуются в проекте
// Для перехода удаляем package-lock.json, node_modules и прописываем npm i(если у нас стоит знак каретки ^), то произойдёт обновления до последней минорной и патч версии, если же нужно другую версию,то:
// npm i --save --save-exact(скачать конкретную версию) react-scripts@12.11.1

// как дебажить без debugger
// Заходим в devtools => sources
// ctrl+p
// пишем название файла(как в VS Code)
// ставим точку остановы

// backword compatibility - обратная совместимость
// некоторые вещи в react.js настолько устаревают, что их приходиться принудительно убирать

// как посмотреть версию babel
// node_modules => @babel => core => package.json

// как синхронизировать локальный state и глобальный state
// С помощью componentDidMount 
// условие if {this.setState({someState:this.props.someValueFromGlobalState})}

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => 
        () => {
            dispatch(me)
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
