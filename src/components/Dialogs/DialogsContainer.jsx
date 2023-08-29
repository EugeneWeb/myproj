import {
    sendMessageCreator,
    updateNewMessageBodyCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    const state = props.store.getState();

    const updateNewMessageBody = (body) => {
        props.store.dispatch(updateNewMessageBodyCreator(body));
    };

    const sendMessage = () => {
        props.store.dispatch(sendMessageCreator());
    };

    const dialogs = state.dialogsPage.dialogs;
    const messages = state.dialogsPage.messages;
    const newMessageBody = state.dialogsPage.newMessageBody;

    return (
        <Dialogs
            updateNewMessageBody={updateNewMessageBody}
            sendMessage={sendMessage}
            dialogs={dialogs}
            messages={messages}
            newMessageBody={newMessageBody}
        />
    );
};

export default DialogsContainer;
