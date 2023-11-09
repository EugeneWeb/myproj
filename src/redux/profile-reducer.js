const ADD_POST = "/profile/ADD-POST";
const SET_USERS_PROFILE = "/profile/SET_USERS_PROFILE";
const SET_PROFILE_STATUS = "/profile/SET_PROFILE_STATUS";
const DELETE_POST = '/profile/DELETE_POST'

const initialState = {
    posts: [
        {
            path: "http://localhost:5000/avatar/avatar1.svg",
            text: "Далеко-далеко, за словесными горами в стране гласных и согласных живут рыбные тексты. Всемогущая инициал даль великий свой однажды образ злых власти снова встретил залетают. Грамматики составитель, единственное вопрос несколько они текста его.",
            likesCount: 25,
        },
        {
            path: "http://localhost:5000/avatar/avatar1.svg",
            text: "Далеко-далеко, за словесными горами в стране гласных и согласных живут рыбные тексты. Всемогущая инициал даль великий свой",
            likesCount: 101,
        },
    ],
    profile: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((value, index) => action.postId !== index)
            }
        case ADD_POST:
            const newPost = {
                path: "http://localhost:5000/avatar/avatar1.svg",
                text: action.postText,
                likesCount: 25,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
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

export const addPost = (postText) => ({
    type: ADD_POST,
    postText
});
export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
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
