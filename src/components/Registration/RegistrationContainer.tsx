import { connect } from "react-redux";
import Registration from "./Registration";
import * as React from "react";
import { userRegistration } from "./../../redux/authReducer";
import { getIsRegistered } from "../../redux/auth-selectors";
import { AppStateType } from "@redux/redux-store";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    userRegistration: (username: string, email: string, password: string) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class RegistrationContainer extends React.Component<PropsType> {
    render() {  
        // const {userRegistraion, ...restProps} = this.props  
        const registration = (username: string, email: string, password: string) => {
            try {
                this.props.userRegistration(username, email, password)
            } catch (error) {
                console.log(error)
            }
        }

        return <Registration {...this.props} registration={registration}/>;
    }
}


const mapStateToProps = (state: AppStateType) => ({
    isRegistered: getIsRegistered(state)
})


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {userRegistration})(RegistrationContainer)







// compose<React.ComponentType>(
//     connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, MDTP),
//     withAuthRedirect
// )(UsersContainer);
