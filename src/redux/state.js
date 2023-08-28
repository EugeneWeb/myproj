// Ставим заглушку в виде функции
let rerenderEntireTree = () => {
    console.log('State Changed')
}

const addPost = () => {
    const newPost = {
        path: "./img/avatars/avatar1.svg",
        text: state.profilePage.newPostText,
        likesCount: 25,
    }

    // Нарушаем принцип чистой функции функционального программирования
    state.profilePage.posts.push(newPost)

    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}
const updateNewPostText = (newPostMessage) => {
    // Нарушаем принцип чистой функции функционального программирования
    state.profilePage.newPostText = newPostMessage

    rerenderEntireTree(state)
}

const state = {
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
        updateNewPostText,
        addPost
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
};

//Таким образом мы будем принимать функцию rerenderEntireTree из index.js без использования циклического импорта
// Будем получать rerenderEntireTree из index.js и записывать в нашу переменную rerenderEntireTree
// observer - наблюдатель
// Данный шаблон проектирования называется наблюдатель
// Теперь нам нужно просто передать в index.js эту функцию и вызвать её там
const subscribe = (observer) => {
    rerenderEntireTree = observer
}



export { addPost, updateNewPostText, subscribe }
export default state;
