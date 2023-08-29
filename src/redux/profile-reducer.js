const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const profileReducer = (action, state) => {

    switch (action.type) {
        case ADD_POST:
            const newPost = {
                path: "./img/avatars/avatar1.svg",
                text: state.newPostText,
                likesCount: 25,
            }
        
            state.posts.push(newPost)
        
            state.newPostText = ''
            return state

        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newPostText
            return state

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