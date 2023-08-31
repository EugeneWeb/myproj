const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

let initialState = {
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
    newMessageBody: 'Введите новое сообщение...'
}

const dialogsReducer = (state = initialState, action) => {
    const stateCopy = {...state}

    switch (action.type) {
        case SEND_MESSAGE:
            const newMessage = {
                id: 4,
                text: stateCopy.newMessageBody,
            };
            stateCopy.messages = [...stateCopy.messages]

            stateCopy.messages.push(newMessage);
            stateCopy.newMessageBody = "";

            return stateCopy;
        case UPDATE_NEW_MESSAGE_BODY:
            stateCopy.newMessageBody = action.newMessageBody;
            return stateCopy;

        default:
            return state;
    }
};

export const sendMessageCreator = () => ({
    type: SEND_MESSAGE,
});
export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    newMessageBody: body,
});

export default dialogsReducer;
