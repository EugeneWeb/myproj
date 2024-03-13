import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";

import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Error from "./components/Error/Error";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

// const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));

import ProfileContainer from "./components/Profile/ProfileContainer";
import RegistrationContainer from "./components/Registration/RegistrationContainer";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, useDispatch } from "react-redux";

import { me } from "./redux/authReducer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import Preloader from "./components/common/Preloader/Preloader";
import { getIsInitialized } from "./redux/app-selectors";
import { getIsAuth } from "./redux/auth-selectors";
const UsersContainer = React.lazy(() =>
    import("./components/Users/UsersContainer")
);

// Для чего используется двойное отрицание?
// Установка ts в существующий проект react, как гуглить
// Как закрыть вкладку в браузере, не нажимая на крестик, как убрать проблему в ts, связанную с путями в файлах, типизация классовых/функциональных компонент
// Исправление ошибки с jsx
// Исправление ошибки с модулями
// Исправление ошибки с svg
// Типизация redux store, селекторов



// Установка ts в существующий проект react, как гуглить
// гуглим запрос: installation react typescript
// На сайте react получаем команду:
// npm install --save typescript @types/node @types/react @types/react-dom @types/jest

// Для чего используется двойное отрицание?
// используется для преобразование в boolean не boolean значения:
// например, 5, мы хотим преобразовать в эквивалент boolean, для этого мы пишем !!5 , т.е сначало !5 преобразовывает в false и !false - это true

// Как закрыть вкладку в браузере, не нажимая на крестик
// С помощью колесика мыши

// как убрать проблему в ts, связанную с путями в файлах
// Для этого нужно добавить в корень react проекта tsconfig с baseUrl: './src'
// {
//     "compilerOptions": {
//       "baseUrl": "./src",
//       "paths": {
//         "@redux/*": ["redux/*"]
//       }
//     }
//   }

// Исправление ошибки с jsx
// Добавляем jsx:preserve
// {
//     "compilerOptions": {
//       "baseUrl": "./src",
//       "jsx": "react",
//       "paths": {
//         "@redux/*": ["redux/*"]
//       }
//     }
//   }

// Исправление ошибки с модулями
// Создаем typing.d.ts, где говорим ts, что у нас есть файлы module.css
// declare module "*.module.css";

// Исправление ошибки с svg
// declare module "*.svg" {
//     const content: any;
//     export default content;
//   }

// типизация классовых/функциональных компонент
// Функциональные:
// type PropsType = {}
// const Comp: FC<PropsType, StateType(если есть)> = () => {
//     return <div></div>
// }
// Классовые:
// type PropsType = {}
// class Comp extends React.Component<PropsType, StateType(если есть)>{}

// Типизация redux store, селекторов
// Так как функция combineReducer возвращает корневой reducer(rootReducer), возвращающий весь state, то мы можем получить тип всего state'а c помощью returnType
// Для остального используем
//@(собака)ts-ignore - Важно! вначале обязатель комментарий // - с помощью этого мы говорим ts компилятору игнорировать всё после строчки ts-ignore

// Для типизации селекторов просто прописываем тип state:AppStateType, возвращаемый тип будет подхватываться ts компилятором






function App(props) {
    const dispatch = useDispatch();

    useEffect(
        () => () => {
            dispatch(me);
        },
        [dispatch]
    );

    if (!props.isInitialized) return <Preloader />;

    return (
        <Router>
            <div className={props.isAuth ? s.wrapAuth : s.wrapNotAuth}>
                <HeaderContainer notAuthClassName={s.header} />
                {props.isAuth && <NavBarContainer />}
                <div className={s.content}>
                    <React.Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route path="/" element={<ProfileContainer />} />
                            <Route
                                path="/profile"
                                element={<ProfileContainer />}
                            />
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
                    </React.Suspense>
                </div>
            </div>
        </Router>
    );
}

const mapStateToProps = (state) => ({
    isInitialized: getIsInitialized(state),
    isAuth: getIsAuth(state),
});

export default connect(mapStateToProps, null)(App);
