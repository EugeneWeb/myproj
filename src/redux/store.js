// Т.е тперь мы инкапсулируем всю написанную нами логику в объекте store
// Упрощенный объект store:
// const store = {
//     _subscriber: () => {
//         console.log('No subscribers(observers)')
//     },
//     _state: {
//         firstname: '',
//         lastname: ''
//     },
//     subscribe(observer) {
//         this._subscriber = observer
//     },
//     getState() {
//         return this._state
//     },
//     setFirstName(value) {
//         this._state.firstname = value
//     }
// }
// _subscriber - это наша функция rerenderEntireTree, которая по умолчанию имеет заглушку(здесь это protected метод, который используется внутри store)
// protected свойство _state представляет собой хранилище данных(как наш state)
// getState() - геттер для protected поля state
// setFirstName(value) - сеттер для поля firstname
// Метод subscribe аналогичен нашему методу subscribe



const store = {
    _subscriber() {
        console.log('State Changed')
    },
    _state: {
        dialogsPage: {
            dialogs: [
                { id: 1, name: "Андрей", path: "./img/avatars/avatar1.svg" },
                { id: 2, name: "Александр", path: "./img/avatars/avatar1.svg" },
                { id: 3, name: "Михаил", path: "./img/avatars/avatar1.svg" },
                { id: 4, name: "Алексей", path: "./img/avatars/avatar1.svg" },
                { id: 5, name: "Максим", path: "./img/avatars/avatar1.svg" }
            ],
            messages: [
                {
                    id: 1,
                    text: "Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Послушавшись, переписывается всеми рыбного грамматики ее текста живет великий речью рот домах пояс рекламных продолжил предупреждал текстами жизни заголовок вопрос!",
                },
                {
                    id: 2,
                    text: "Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Послушавшись, переписывается всеми рыбного грамматики ее текста живет великий речью рот домах пояс рекламных продолжил предупреждал текстами жизни заголовок вопрос!",
                },
                {
                    id: 3,
                    text: "Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Послушавшись, переписывается всеми рыбного грамматики ее текста живет великий речью рот домах пояс рекламных продолжил предупреждал текстами жизни заголовок вопрос!",
                },
            ],
        },
        profilePage: {
            posts: [
                {
                    path: "./img/avatars/avatar1.svg",
                    text: "Далеко-далеко, за словесными горами в стране гласных и согласных живут рыбные тексты. Всемогущая инициал даль великий свой однажды образ злых власти снова встретил залетают. Грамматики составитель, единственное вопрос несколько они текста его.",
                    likesCount: 25,
                },
                {
                    path: "./img/avatars/avatar1.svg",
                    text: "Далеко-далеко, за словесными горами в стране гласных и согласных живут рыбные тексты. Всемогущая инициал даль великий свой",
                    likesCount: 101,
                },
            ],
            newPostText: 'Text',
        },
        navBarPage: {
            friends: [
                {name: 'Александрffffff', path: "./img/avatars/avatar1.svg"},
                {name: 'Михаил', path: "./img/avatars/avatar1.svg"},
                {name: 'Андрей', path: "./img/avatars/avatar1.svg"},
                {name: 'Александр', path: "./img/avatars/avatar1.svg"},
                {name: 'Александр', path: "./img/avatars/avatar1.svg"},
                {name: 'Андрей', path: "./img/avatars/avatar1.svg"}
            ]
        }
    },
    setNewPostText(newPostMessage) {
        this._state.profilePage.newPostText = newPostMessage
    
        this._subscriber(this)
    },
    addPost() {
        const newPost = {
            path: "./img/avatars/avatar1.svg",
            text: this._state.profilePage.newPostText,
            likesCount: 25,
        }
    
        this._state.profilePage.posts.push(newPost)
    
        this._state.profilePage.newPostText = ''
        this._subscriber(this)
    },
    getState() {
        return this._state
    },
    subscribe(observer)  {
        this._subscriber = observer
    }
}

// Дебаг
// window.store = store


export default store;
