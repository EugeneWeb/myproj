const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

const dialogsReducer = (action, state) => {
    switch (action.type) {
        case SEND_MESSAGE:
            const newMessage = {
                id: 4,
                text: state.newMessageBody,
            };

            state.messages.push(newMessage);
            state.newMessageBody = "";

            return state;
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newMessageBody;
            return state;

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
