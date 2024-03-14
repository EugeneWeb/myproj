// import StoreContext from "../../StoreContext";
import { connect } from "react-redux";
import {
    dialogsActions
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getDialogs, getMessages, getNewMessageBody } from "../../redux/dialogs-selectors";
import { AppStateType } from "@redux/redux-store";

const mapStateToProps = (state) => {
    return {
        dialogs: getDialogs(state),
        messages: getMessages(state),
        newMessageBody: getNewMessageBody(state)
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {}
type OwnPropsType = {}

export default compose<React.ComponentType>(
    connect<MapDispatchPropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { sendMessage: dialogsActions.sendMessage }),
    withAuthRedirect
)(Dialogs);
