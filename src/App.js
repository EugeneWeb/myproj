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

//redux-ducks это, доработка, связанная с константами(какие проблемы могут возникнуть), изменения .then на async в reducer'ах, try{} catch(){}, добавил логику отправки аватарок и обой с сервера, updateObjectInArray, деструктуризация пропсов, отличие url от uri, более продвинутая деструктуризация, Вынес пагинатор в общие компоненты, добавил компоненту User, Как безопаснее всего пользоваться компьютером других людей? Деструктуризация this.props
// redux-ducks - методология для структурирования кода(подход к организации) reducer'ов и связанных с ними элементов, который основывается на том, что все элементы, связанные с reducer'ом(action контстанты, action creator, thunk, thunk creator) следует держать в одном файле вместе с reducer'ом(один такой файл именуется ducks)

// доработка, связанная с константами(какие проблемы могут возникнуть)
// в нашем приложении action типы(константы) именуются в каждом reducer'e не конкретизированно(в них не содержится названия reducer'a), это может выливаться в ошибку, когда новый разработчик, не знающий название уже существующих типов начинает использовать зарезервированные типы, ТО будут срабатывать несколько case'ов и это может приводить к неопределенному поведению программы
// у нас: const ADD_POST = "ADD-POST";
// Следует так: const ADD_POST = "/prodile/ADD-POST";
// Названия action'ов должны быть уникальными

// добавил логику отправки аватарок и обой с сервера
// c помощью динамической составляющей в url(т.е /images/:imageName и отдаём запрашиваемый файл)

// деструктуризация пропсов
// Для улучшения читабельности и уменьшения кода

// отличие url от uri
// url - это идентификатор сервера в сети
// uri - это индентификатор ресурса на сервере

// более продвинутая деструктуризация
// ({ input, meta:{touched, error}, className, ...props })

// Как безопаснее всего пользоваться компьютером других людей?
// Через режим гостя, не сохраняются куки

// Деструктуризация this.props
// В методах и функциях желательно(чтобы обезопасить себя от лишних ошибок, кот-е могут возникнуть) всегда деструктрузировать this.props и вытаскивать нужные нам значения)

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
