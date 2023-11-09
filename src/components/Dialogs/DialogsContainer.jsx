// import StoreContext from "../../StoreContext";
import { connect } from "react-redux";
import {
    sendMessage
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getDialogs, getMessages, getNewMessageBody } from "../../redux/dialogs-selectors";

const mapStateToProps = (state) => {
    return {
        dialogs: getDialogs(state),
        messages: getMessages(state),
        newMessageBody: getNewMessageBody(state)
    }
}

export default compose(
    connect(mapStateToProps, { sendMessage }),
    withAuthRedirect
)(Dialogs);
