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

// Мини соц.сеть, как работают пропсы на более низком уровне, debugger, routing это, мож ли помещ в BrowserRouter не весь код, a vs NavLink, Link, класс active, noreferrer/noopener
// Ключевое слово debugger позволяет вызвать debugger в браузере при выполнении определенного участка кода
// Компоненты react являются функциями, во время вызова которых передают объект props, куда помещают в формате ключ-значение все аргументы переданные в тег(т.е по умолчанию props есть у всех компонентов, но он равен пустому объекту)


function App() {
  // Помещаем весь код в Router, так как в Header используем NavLink, а в content Route'ы(но в React'е не обязательно помещать в тег Router весь код, можно только часть, где используем роутинг)
  // При этом помещаем в тег content(а не просто чистый тег Route сразу после NavBar) из-за того, что нужно избежать повтора кода: иначе придется использовать grid-area для ВСЕХ страниц
  // Routing(маршрутизация) - система, которая позволяет отрисовывать нужные компоненты в зависимости от url адреса

  // a vs NavLink
  // Так как мы реализуем SPA приложение и нам не нужно получать новую HTML страницу(делать запросы на получение HTML страницу), то мы должны использовать NavLink. NavLink - это компонент, который возвращает обычный тег a, но с измененным поведением при клике(e.preventDefault() и т.д), таким образом, при нажатии на ссылку меняется url, но не происходит перезагрузки страницы
  // Если посмотрим network, то при перезагрузке страницы(что и происходит с тегом a), мы каждый раз заново получаем html страницу

  // Link
  // это то же самое, что и NavLink, только не добавляет класс active

  // класс active добавляется на последнюю выбранную ссылку NavLink
  // Проблема в том, что при использовании CSS модулей мы не сможем добавить стиль active, так как будут добавляться префиксы, поэтому стандартый класс аctive нужно заменить на active с префиксами, для этого используем функцию в className(атрибута activeClassName больше нет) 
  // className={({isActive}) => isActive ? s.active : null}  т.е если активен, то класс равен s.active, иначе не равен ничему

  // noopener noreferrer
  // При использовании target="_blank" для обеспечения безопасности рекомендуется использовать  noopener noreferrer
  // <a href="#" target="_blank" rel="noopener noreferrer"></a>
  // Это связано с атакой tabnabbing(на новой вкладке можно получить доступ ко всем информации предыдущей страницы через window.opener, ТО злоумышленники могут получить данные или изменить существующие)
  // noreferrer нужен для того, чтобы предоствратить передачу данных о странице в HTTP заголовках
  // Современные браузеры автоматически добавляют noopener, но noreferrer рекомендуется добавлять
    return (
        <Router>
            <div className={s.wrap}>
                <Header />
                <NavBar />
                <div className={s.content}>
                    <Routes>
                        <Route path="/" element={<Profile />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/messages" element={<Dialogs />} />
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
