const SEND_MESSAGE = "/dialogs/SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_BODY = "/dialogs/UPDATE-NEW-MESSAGE-BODY";

let initialState = {
    dialogs: [
        { id: 1, name: "Андрей", path: "http://localhost:5000/avatar/avatar1.svg" },
        { id: 2, name: "Александр", path: "http://localhost:5000/avatar/avatar1.svg" },
        { id: 3, name: "Михаил", path: "http://localhost:5000/avatar/avatar1.svg" },
        { id: 4, name: "Алексей", path: "http://localhost:5000/avatar/avatar1.svg" },
        { id: 5, name: "Максим", path: "http://localhost:5000/avatar/avatar1.svg" }
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
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            const newMessage = {
                id: 4,
                text: action.newMessageBody,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageBody: ''
            };
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.newMessageBody
            };

        default:
            return state;
    }
};

export const sendMessage = (newMessageBody) => ({
    type: SEND_MESSAGE,
    newMessageBody
});
export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    newMessageBody: body,
});

export default dialogsReducer;
