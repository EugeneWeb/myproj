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
import NavBarContainer from "./components/NavBar/NavBarContainer";


// Для чего нужен redux-form, подключение redux-form(использование), можно ли обращать напрямую к form, как правильно получать данные из form reducer'а(как правильно называть callback функцию, кот-ую мы будем вешать на onSubmit), что такое field level validation, создание валидаторов(+ добавление), что такое props.children, для чего мы добавили elementtype



// смотреть MyPosts.jsx 

// redux-form УСТАРЕЛ!!!
// redux-form используется для работы со state'ом для всех форм(дело в том, что каждая форма должна иметь input'ы, в которых данные отображаются из state засчет onChange, также каждая форма имеет доп. состояния: по типу было ли тронуто одно из полей формы, если да, то отобразить правильность в веденных данных и т.д) 
// Т.е redux-form берёт на себя создания onChange, создание поля для хранения введенной информации из input

// Подключение redux-form
// npm i redux-form --force(т.к redux-form УСТАРЕЛ!!!)
// Далее добавляем reducer из redux-form в store
// Для использования redux-form оборачиваем наши формы с помощью 
// reduxForm({form:"name"})(formComponent)
// теперь в контейнерную компоненту, кот-я вернулясь после использования reduxForm()() опрокидываем callback handleSubmit, который в качестве аргументов получает все значения формы(оттуда и будем вызывать функции для работы с dispatch/ajax)
// Также не забываем в common formControls создать свои компоненты для стандартных компонент:Textarea, input для того, чтобы получать данные о состоянии формы и менять стили
// заменяем input/textarea на Field

// можно ли обращать напрямую к form
// нет, к redux-form не нужно обращаться напрямую

// как правильно получать данные из form reducer'а(как правильно называть callback функцию, кот-ую мы будем вешать на onSubmit)
// Получаем данные не напрямую из form, а из функции onSubmit, кот-ую мы передаём в onSubmit в reduxFormComponent, после этого в компоненте самой формы(кот-ую мы передаём в reduxForm()()) onSubmit={props.handleSubmit}
// handleSubmit - это функция, которая генерируется с помощью reduxFormComponent и опрокидывается через пропсы
// Что она делает:
// e.preventDefault()
//  упаковывает все данные формы в один объект
// вызывает ту функцию, кот-ую мы передали в reduxFormComponent и передаёт в нее сформированный объект с данными

// что такое field level validation
// валидация конкретного input'а

// создание валидаторов(+ добавление)
// Для валидации создаём папку utils(или helpers)
// validators.js
// Валидаторы - это функции, которые проверяют данные и возвращают null, если данные валидные и строку, если данные оказались не валидными
// Для добавления используем атрибут validate={[массив функций(валидаторов)]}

// что такое props.children
// С помощью props.children можно получить содержимое парного компонента(т.е если у нас есть компонент Textarea, в кот-ый мы помещаем какие-то теги, то мы сможем их получить через props.children)

// для чего мы добавили elementtype
// вначале мы добавили функцию formControls, для того, чтобы обеспечить повторное использование кода
// далее Для того, чтобы понимать какой html тэг должен быть отрисован, мы добавили атрибут elementtype, кот-ый берётся из props'ов и из кот-го рисуется html тэг

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

export default App;
