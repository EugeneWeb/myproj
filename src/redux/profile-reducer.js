const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const initialState = {
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
}

const profileReducer = (state = initialState, action) => {

    const stateCopy = {...state}

    switch (action.type) {
        case ADD_POST:
            const newPost = {
                path: "./img/avatars/avatar1.svg",
                text: stateCopy.newPostText,
                likesCount: 25,
            }
            stateCopy.posts = [...stateCopy.posts]

            stateCopy.posts.push(newPost)

        
            stateCopy.newPostText = ''
            return stateCopy

        case UPDATE_NEW_POST_TEXT:
            stateCopy.newPostText = action.newPostText
            return stateCopy

        default:
            return state
    }
}


export const addPostActionCreator = () => ({
    type: ADD_POST
})
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text
})

export default profileReducer