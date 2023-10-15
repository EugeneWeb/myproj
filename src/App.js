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

// Нужны ли тесты?



// Нужны ли тесты? Что такое unit тесты, в чем преимущество, в чем отличие от интеграционных тестов, самое первое тестирование, почему .test.js, jest это, тестирование profileReducer, как много expect'ов должно быть, tdd это(преимущества и недостатки), Почему если мы посмотрим в консоль, то увидим, что отрисовка компоненты происходит 2 раза(подробно объяснить), react.js/node.js/vanilla js debug VS Code
// Тесты необходимы, позволяют ускорить разработку

// Что такое unit тесты, в чем преимущество, в чем отличие от интеграционных тестов
// unit тесты - это тесты отдельных модулей(модульные тесты), данные тесты используются для тестирования отдельных часте приложения(функций, классов и т.д)(наша система состоит из маленьких частей - модулей, будем тестировать блоки по-отдельности). Как правило, если приложение работает правильно по частям, то работает также правильно во время интеграционных тестов(тестов целых систем, приложений, как части взаимодействуют друг с другом)
// Преимущество unit тестов - возможность тестирование отдельных частей программы на этапе разработки

// самое первое тестирование, почему .test.js
// Для того, чтобы запустить тестирование выполняем команды npm test(webpack таким образом поймёт, что мы хотим запустить все файлы с расширением .test.js, т.е .test.js даёт понять webpack о том, что этот файл используется для тестирования)
// По умолчанию создаётся файл App.test.js, который и будет запущен

// jest - это пакет для тестирования js

// тестирование profileReducer
// Один из подходов гласит, что файлы для тестирования должны находится рядом вместе с самим файлом
// ctrl c ctrl v profileReducer, добавляем .test.js
// для создания тестов будем использовать функцию из jest it:
// it('' - название теста, пояснение к нему, что проверяем(обычно используем after, should, should be), () => {} - действия)
// it('test name', () => {
    // start data
    // Для тестирования profileReducer нам нужен state и action
    // const state = {}(если тестов с одним state'ом несколько, то выносим)
    // const action = actionAC() - для создания action'а импортируем action creator

    // action
    // функции, действия, которые должны быть проверены
    // Для проверки импортируем profileReducer
    // const newState = profileReducer(state, action)

    // expectation(по сути дела условия, которые определяют прошёл тест или нет)
    // expect() - функция jest для тестирования
    // expect(newState.posts.length(значение которое мы сравниваем)).toBe(5)

// })
// При этом it и expect можно не импортировать, среда сделает это за нас

// как много expect'ов должно быть
// Желательно как можно меньше, чтобы протестировать какую-то одну вещь

// tdd это(преимущества и недостатки)
// tdd - test driven development(если переводить - разработку двигают тесты) - разработка посредством тестирования(сначало пишем тест, а потом код для того, чтобы удовлетворить тест), т.е тестируем то, что по сути ещё не реализовано и пока может даже не иметь интерфейс
// Преимущества:
// 1. 100% покрытие кода unit тестами
// 2. Уменьшение время на debug кода(так как код уже протестирован и работает, тесты проходить быстрее, чем дебаг)
// 3. Написание кода таким образом, чтобы сразу удовлетворять тестам(т.е исключаются случаи сложно тестируемого кода)(хорошо структурируемый код для тестов)
// 4. Понимание того, как наш код будет использоваться на практике(продуманный интерфейс и архитектура приложения)
// Недостатки
// 1. Такой подход к разработке требует готового ТЗ(поэтому не подходит для стартапов и других часто изменяющихся проектов(так как тесты стоят времени - а время - денег, постоянное переписывание кода и тестов к коду слишком затратно))

// Почему если мы посмотрим в консоль, то увидим, что отрисовка компоненты происходит 2 раза(подробно объяснить)
// это связано с тем, что мы используем React.StrictMode, который перерисовывает компоненту повторно и тестирует написанный код
// Благодаря React.StrictMode происходит обнаружение потенциальных проблем в приложении на React на этапе разработки(в продакшене ни на что не влияет), среди них:
// 1. Обнаружение устаревших методов
// 2. Предупреждение о небезопасном использовании методов
// 3. Предупреждение о не эффективном использовании методов
// Вообщем React.StrictMode позволяет избежать проблем, которые могут возникнуть при разработке React приложения на этапе разработки

// react.js/node.js/vanilla js debug VS Code
// Для дебага заходим в run and debug
// create launch json file: для react web chrome, для node.js используем node.js(после этого создастся соотв-ий файл с конфигурацией)
// для react.js изменяем порт, для node.js оставляем всё как есть
// Для запуска в react прописываем npm start, а потом нажимаем на кнопку play в run and debug
// Для запуска в node.js просто выбираем команду для запуска(для этого нажимаем на node.js npm run dev) и запускаем через play

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
