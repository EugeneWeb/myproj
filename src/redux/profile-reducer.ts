import { ProfileType } from "types/types";
import { InferActionsType } from "./redux-store";



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

const profileReducer = (state = initialState, action: ProfileActionsType) => {
    switch (action.type) {
        case '/profile/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(
                    (value, index) => action.postId !== index
                ),
            };
        case '/profile/ADD-POST':
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

        case '/profile/SET_USERS_PROFILE':
            return {
                ...state,
                profile: { ...action.profile },
            };
        case '/profile/SET_PROFILE_STATUS':
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

export const profileActions = {
    addPost: (postText: string) =>
        ({
            type: "/profile/ADD-POST",
            postText,
        } as const),
    deletePost: (postId: number) =>
        ({
            type:  "/profile/DELETE_POST",
            postId,
        } as const),
        
    setUsersProfile: (profile: ProfileType | {}) =>{
        return ({
            type: "/profile/SET_USERS_PROFILE",
            profile,
        } as const)
    }
        ,
    setProfileStatus: (status: string) =>
        ({
            type: "/profile/SET_PROFILE_STATUS",
            status,
        } as const),
};

export default profileReducer

export type InitialStateType = typeof initialState;
export type ProfileActionsType = InferActionsType<typeof profileActions>
