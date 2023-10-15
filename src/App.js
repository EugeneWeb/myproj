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

// Зачем может понадобиться shouldComponentUpdate, PureComponent(+ цепочка наследования, как сделать также с функциональной компонентой, подводные камни с PureComponent и ФК), программирование, алгоритм это, почему сейчас в вышеперечисленном нет смысла?
// метод жизненного цикла shouldComponentUpdate(prevProps, prevState) { return this.props != prevProps || this.state != prevState(на самом деле не так, это псевдокод, чтобы показать основную логику, неправильно так как очевидно, что ссылка на this.props/state не меняется) } - метод, который возвращает bool и в зависимости от изменений в state'e/props'е(по усл) выполняет render компоненты, по умолчанию true, т.е компонента в любом случае рендериться(и так как наши чистые компоненты зависят исключительно от пропсов, то мы можем запретить рендер компоненты в случае, если props'ы не были изменены)
// class Comp extends React.PureComponent - класс PureComponent уже содержит вышеописанную логику и shouldComponentUpdate уже определен.
// цепочка наследования:
// Component -> PureComponent -> наша компонента
// В случае с PureComponent нужно учитывать, что на дочерние не чистые компоненты PureComponent не работает, поэтому нужно оборачивать PureComponent также и дочерние элементы для улучшения производительности
// Для функциональных компонент существует HOC React.memo(function Comp() { return (<h1>Hey</h1>)}) - запрещает render компонентов, если props'ы(только props'ы, не следит за state'ами) не были изменены

// Программирование - это процесс создания инструкций, которые компьютер может выполнить.
// Алгоритм - это точная последовательность шагов, предназначенная для решения определенной задачи или проблемы.

// почему сейчас в вышеперечисленном нет смысла?
// Сейчас отчасти возможности React.memo и PureComponent предоставляет HOC connect(redux сам сравнивает текущее и предыдущее состояние state'а и если state не был изменён, то не выполняет перерисовку компоненты) 

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
