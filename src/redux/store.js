const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

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
        
    },
    getState() {
        return this._state
    },
    subscribe(observer)  {
        this._subscriber = observer
    },
    dispatch(action) {
        if(action.type === ADD_POST) {
            const newPost = {
                path: "./img/avatars/avatar1.svg",
                text: this._state.profilePage.newPostText,
                likesCount: 25,
            }
        
            this._state.profilePage.posts.push(newPost)
        
            this._state.profilePage.newPostText = ''
            this._subscriber(this)
        }
        else if(action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newPostText
    
            this._subscriber(this)
        }
    }
}

export const addPostActionCreator = () => ({
    type: ADD_POST
})
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text
})


export default store;
