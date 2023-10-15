import profileReducer, {addPost, deletePost} from "./profile-reducer";


// start data
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
    profile: null,
};

it('length of posts should be incremented', () => {
    // start data
    const action = addPost("message")

    // action
    const newState = profileReducer(initialState, action)

    // expectation
    expect(newState.posts.length).toBe(3)
})

it('message of new post should be correct', () => {
    // start data
    const action = addPost('message')

    // action
    const newState = profileReducer(initialState, action)

    // expectation
    expect(newState.posts[2].text).toBe('message')
})

it('after deleting length of posts should be decremented', () => {
    // start data
    const action = deletePost(0)

    // action
    const newState = profileReducer(initialState, action)

    // expectation
    expect(newState.posts.length).toBe(1)
})

it('after deleting length of posts shouldn\'t be decremented if postId is incorrect', () => {
    const action = deletePost(10)
    const newState = profileReducer(initialState, action)
    expect(newState.posts.length).toBe(2)
})

// const profileReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_POST:
//             const newPost = {
//                 path: "./img/avatars/avatar1.svg",
//                 text: action.postText,
//                 likesCount: 25,
//             };
//             return {
//                 ...state,
//                 posts: [...state.posts, newPost],
//                 newPostText: "",
//             };

//         case SET_USERS_PROFILE:
//             return {
//                 ...state,
//                 profile: { ...action.profile },
//             };
//         case SET_PROFILE_STATUS:
//             return {
//                 ...state,
//                 profile: {
//                     ...state.profile,
//                     status: action.status,
//                 },
//             };
//         default:
//             return state;
//     }
// };

// export const addPost = (postText) => ({
//     type: ADD_POST,
//     postText
// });

// export const setUsersProfile = (profile) => ({
//     type: SET_USERS_PROFILE,
//     profile,
// });
// export const setProfileStatus = (status) => ({
//     type: SET_PROFILE_STATUS,
//     status,
// });

