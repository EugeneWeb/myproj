import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";

import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";

import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Error from "./components/Error/Error";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

// Добавил переход на страницы пользователей, почему в компоненту НЕ СТОИТ передавать в качестве атрибута props={this.props}, как передать все данные из пропса контейнерной компоненты в презентационную, просмотр данных в буфере обмена VS Code, WithRouter(+решение проблемы router v6), как посмотреть данные о пропсах в консоле, можно ли добавить несколько параметров в Route

// почему в компоненту НЕ СТОИТ передавать props={this.props}
// Потому что то, что мы передаём в props попадает в объект props в компоненту, ТО мы получим, что в компоненте будет props, а в нём ещё один props

// как передать все данные из пропса контейнерной компоненты в презентационную
// С помощью такого синтаксиса:
// <PresentationalComp {...this.props}/>

// просмотр данных в буфере обмена VS Code
// по умолчанию нет такой функции, нужно скачать расширение clipboard history
// для просмотра ctrl + shift + v

// WithRouter - это компонента высшего порядка(HOC(хок) - high order component)
// С помощью данной функции можно передать данные о местоположении(location), параметрах(params) и др.
// данная компонента, начиная с router v6 принимает только функции(так как она теперь на хуках)!
// Для работы с классовыми компонентами можно сымитировать функцию WithRouter, создав свою альтернативу на хуках:
// альтернатива просто принимает классовую компоненту, оборачивает ёё в функциональную и возвращает функциональную компоненту(та в свою очередь возвращает классовую компоненту вместе с данными, полученными из хуков: useLocation, useNavigate, useParams)

// как посмотреть данные о пропсах в консоле
// Для этого используем debugger и в момент отладки пишем в консоле this.props

// можно ли добавить несколько параметров в Route
// Да, с помощью такого синтаксиса: /:param1/:param2

function App(props) {
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar />
                <div className={s.content}>
                    <Routes>
                        <Route path="/profile/:userId" element={<ProfileContainer />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/messages/*" element={<DialogsContainer />} />
                        <Route path="/music" element={<Music />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/users" element={<UsersContainer />} />

                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
