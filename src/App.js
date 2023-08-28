import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";

import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";

import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Dialogs from "./components/Dialogs/Dialogs";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Error from "./components/Error/Error";

// Осн пробл изм данных в state.js, поч нельзя исп getElementById, react по поводу ref, virtual DOM, упрощ FLUX архит, state management, что происх в наш прим(оч важ мысл об input в наш прим), redux это
// Так как мы не имеем права изменять данные state.js в UI(так как он отвечает за события и отрисовку компонентов), то мы должны как-то изменить state через UI, не нарушив основные принципы функционального программирования и SOLID принципов

// поч нельзя использовать getElementById 
// В react нет доступа к объекту document(т.е не только getElementById запрещено, но и addEventListener, querySelector) напрямую через JSX, это связано с тем, что react имеет свой virtual DOM, с которым мы и взаимодействуем, а virtual DOM уже отвечает за отображение оптимальным способом DOM элементов(что в принципе и является причиной популярности react), ТО взаимодействие с DOM - на react
// Т.е мы не можем взяимодействовать с DOM напрямую(через объект document), потому что в react существует еще один уровень абстракции в виде Virtual DOM, при чём одна из причин - это то, что нельзя определить является тот элемент, который мы возмём через Virtual DOM, частью DOM в данный момент или нет(сейчас может быть совершенна другая разметка динамически быть выведена)

// react по поводу ref
// ref не рекомендуется использовать или свести к минимуму(сильно влияет на производительность)
// Это связано c тем, что react имеет свой virtual DOM и очень затратно давать ссылку на элемент обычного DOM дерева, намного быстрее изменять элемент через virtual DOM и отдавать react'y работу с DOM деревом браузера
// При чём читать значение DOM элементов это ещё ладно, но изменение - очень трудозатратная вещь

// В state.js мы немного нарушим принцип чистой функции, будем изменять глобальный state в функции addPost(но это ещё допустимо, так как они находятся в одном файле) 
// При чём если просто с помощью props прокинем функцию addPost - то не сработает, так как помимо вызова функции нужно заново рендерить(вызывать функцию render) разметку(пока используем render всей разметки в образовательных целях) 

// После того, как мы обернули всё в функцию и вызвали её, нам нужно создать новый файл render.js, куда мы перенесём новую функцию(это связано с тем, что иначе получим циклический import(если не создавать третий файл, то нам нужно в state перебросить данные из Index.js, а в Index.js данные state, чтобы прокинуть данные через пропсы) - это очень плохой подход, так делать нельзя)


// ТО образом при записи в textarea текста и нажатии на кнопку у нас срабатывает событие onClick, вызывается callback функция, которая изменяет state с помощью функции addPost, которую получает MyPosts через props, далее срабатывает функция addPost, изменяет state, а затем вызывает функцию rerenderEntireTree, которая отображает изменение на странице(прокидывая новые данные опять через пропсы(как при первой отрисовке))
// Получаем однонаправленный поток данных
// UI (происходит action на UI)--> BLL (новое значение state через пропсы)--> UI
// Это называется FLUX архитектура - подход к организации потока данных(в реальных проектах team lead выбирает какой подход к организации потока данных выбрать, какой state manegement - управление состоянием в данном приложении лучше использовать)
// state management - это способ организации и управления данными(состоянием) в приложении
// На FLUX архитектуре написана одна из реализаций redux
// Redux - это библиотека, которая реализует FLUX архитектуру




// ОЧЕНЬ ВАЖНО! согласно FLUX архитектуре, когда мы пишем что-то в textarea - это изменение UI(да, текст в input - это тоже UI и это должно контролироваться), но изменение UI не может изменяться при неизменном state, ТАК КАК FLUX ЭТО ОДНОНАПРАВЛЕННЫЙ ПОТОК ДАННЫХ, А ТУТ НАШ ПОТОК НАРУШАЕТСЯ ТЕМ, ЧТО МЫ МОЖЕМ ВМЕШИВАТЬ В UI НАПРЯМУЮ БЕЗ state

// Для исправления воспользуемся атрибутом value, который запрещает вводит данные, далее на событие onChange передаём данные в state, А ТОЛЬКО ПОТОМ В UI!!!!

function App(props) {
    debugger
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar navBarPage={props.state.navBarPage} />
                <div className={s.content}>
                    <Routes>
                        <Route path="/profile" element={<Profile profilePage={props.state.profilePage}/>} />
                        <Route path="/news" element={<News />} />
                        <Route path="/messages/*" element={<Dialogs dialogsPage={props.state.dialogsPage} />} />
                        <Route path="/music" element={<Music />} />
                        <Route path="/settings" element={<Settings />} />

                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
