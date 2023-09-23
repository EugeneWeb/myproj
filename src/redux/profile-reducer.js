const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";

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
    newPostText: "Text",
    profile: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                path: "./img/avatars/avatar1.svg",
                text: state.newPostText,
                likesCount: 25,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            };

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newPostText,
            };
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: { ...action.profile },
            };
        case SET_PROFILE_STATUS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    status: action.status,
                },
            };
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({
    type: ADD_POST,
});
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text,
});
export const setUsersProfile = (profile) => ({
    type: SET_USERS_PROFILE,
    profile,
});
export const setProfileStatus = (status) => ({
    type: SET_PROFILE_STATUS,
    status,
});

export default profileReducer;
