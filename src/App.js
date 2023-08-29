import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import s from "./App.module.css";

import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";

import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Error from "./components/Error/Error";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


// Context API, про презентационные компоненты с Context API, React-Redux

// Большая проблема пропсов, в том, что нужно прокидывать данные через каждый компонент, начиная с app.js для того, чтобы получить доступ к данным в компоненте
// Для решения этой проблемы используем context API
// Context API позволяет создать контекст, данные в которым будут доступны всем дочерним элементам
// Но не забываем, что используем контекст для в крайних случаях(например изменение языка для всего приложения, смена темы), как и глобальные переменные контекст опасная вещь, которая может усложнять код и его тестирование

// Cоздание и использование контекста:
// Первым делом создаём контекст(как правило в отдельном файле)
// const MyContext = React.createContext(defaultValue(наприм, null))
// Далее оборачиваем все элементы, у которых будет доступ к данном контексту
// Provider - тот, кто обеспечивает
// <MyContext.Provider value={помещаем сюда данные, кот-ые будут видны всем элементам внутри данного тега}></MyContext.Provider>
// Для того, чтобы получить доступ к контексту в дочернем элементе также оберачиваем:
// const component = (props) => {
//     // Consumer - потребитель
//     return (
//         <MyContext.Consumer>
//             {
//                 (value(например store, которые объявили в value)) => {
//                     здесь можем логику поместить
//                     return(jsx код)
//                 }
//             } - ОБЯЗАТЕЛЬНО СКОБКИ ДОЛЖНЫ БЫТЬ ВНУТРИ ДАННОГО ТЕГА, ИНАЧЕ ОШИБКА
// ТАКЖЕ НЕ ЗАБЫВАЕМ О ТОМ, ЧТО Context НУЖНО ИМПОРТИРОВАТЬ В КАЖДЫЙ ФАЙЛ КОМПОНЕНТА, ГДЕ ИСПОЛЬЗУЕМ
//         </MyContext.Consumer>
//     )
// } 
// 

// про презентационные компоненты с Context API
// При этом Context API может быть использовано ТОЛЬКО с контейнерными компонентами(это связано с тем, что презентационные компоненты - это чистые функции, а чистые функции не должны иметь доступ к глобальным переменным, а тем более их использовать или изменять)

// Также создаем отдельную компоненту Provider, которая будет добавлять Context, так как не совсем удобно использовать подобным образом использовать Context

// React-Redux - это что-то наподобие express и node.js, т.е библиотека, которая даёт более удобный интефейс для работы с Redux(прячет за собой детали Redux). ТО мы работаем не с чистым Redux, а с React-Redux, кот-ый сам преобразовывает React-Redux код в Redux код, также она имеет существенный плюc: оптимизирует работу state таким способом, чтобы отрисовывались только отдельные компоненты, а не все компоненты целиком(как у нас)

function App(props) {
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar navBarPage={props.state.navBarPage} />
                <div className={s.content}>
                    <Routes>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/messages/*" element={<DialogsContainer />} />
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
