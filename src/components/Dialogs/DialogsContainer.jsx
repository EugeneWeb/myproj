import StoreContext from "../../StoreContext";
import {
    sendMessageCreator,
    updateNewMessageBodyCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {(store) => {

                const state = store.getState();

                const updateNewMessageBody = (body) => {
                    store.dispatch(updateNewMessageBodyCreator(body));
                };

                const sendMessage = () => {
                    store.dispatch(sendMessageCreator());
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
            }}
        </StoreContext.Consumer>
    );
};

export default DialogsContainer;
