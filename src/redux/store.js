import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";



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
            newMessageBody: 'Введите новое сообщение...'
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
    getState() {
        return this._state
    },
    subscribe(observer)  {
        this._subscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(action, this._state.profilePage)
        this._state.dialogsPage = dialogsReducer(action, this._state.dialogsPage)
        this._state.navBarPage = navbarReducer(action, this._state.navBarPage)
        
        this._subscriber(this)
    }
}


export default store;
