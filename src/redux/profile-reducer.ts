import { ProfileType } from "types/types";

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
    profile: null as ProfileType,
};

const profileReducer = (state = initialState, action: ActionsType) => {
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

type AddPostType = ReturnType<typeof addPost>
export const addPost = (postText: string) => ({
    type: ADD_POST,
    postText
} as const);
type DeletePostType = ReturnType<typeof deletePost>
export const deletePost = (postId: number) => ({
    type: DELETE_POST,
    postId
} as const);
type SetUserProfileType = ReturnType<typeof setUsersProfile>
export const setUsersProfile = (profile: ProfileType | {}) => ({
    type: SET_USERS_PROFILE,
    profile,
} as const);
type SetProfileStatusType = ReturnType<typeof setProfileStatus>
export const setProfileStatus = (status: string) => ({
    type: SET_PROFILE_STATUS,
    status,
} as const);

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionsType = SetProfileStatusType | SetUserProfileType | DeletePostType | AddPostType
