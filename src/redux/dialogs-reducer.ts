import { InferActionsType } from "./redux-store";


let initialState = {
    dialogs: [
        {
            id: 1,
            name: "Андрей",
            path: "http://localhost:5000/avatar/avatar1.svg",
        },
        {
            id: 2,
            name: "Александр",
            path: "http://localhost:5000/avatar/avatar1.svg",
        },
        {
            id: 3,
            name: "Михаил",
            path: "http://localhost:5000/avatar/avatar1.svg",
        },
        {
            id: 4,
            name: "Алексей",
            path: "http://localhost:5000/avatar/avatar1.svg",
        },
        {
            id: 5,
            name: "Максим",
            path: "http://localhost:5000/avatar/avatar1.svg",
        },
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
    newMessageBody: "Введите новое сообщение...",
};

const dialogsReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case '/dialogs/SEND-MESSAGE':
            const newMessage = {
                id: 4,
                text: action.newMessageBody,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageBody: "",
            };
        case '/dialogs/UPDATE-NEW-MESSAGE-BODY':
            return {
                ...state,
                newMessageBody: action.newMessageBody,
            };

        default:
            return state;
    }
};


export const dialogsActions = {
    sendMessage: (newMessageBody: string) =>
        ({
            type: "/dialogs/SEND-MESSAGE",
            newMessageBody,
        } as const),
    updateNewMessageBodyCreator: (body: string) =>
        ({
            type: "/dialogs/UPDATE-NEW-MESSAGE-BODY",
            newMessageBody: body,
        } as const),
};

export default dialogsReducer;

export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsType<typeof dialogsActions>;
