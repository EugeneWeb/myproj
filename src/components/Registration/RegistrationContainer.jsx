import { connect } from "react-redux";
import Registration from "./Registration";
import React from "react";
import { userRegistration } from "./../../redux/authReducer";

class RegistrationContainer extends React.Component {
    render() {
        const registration = (username, email, password) => {
            try {
                this.props.userRegistration(username, email, password)
            } catch (error) {
                console.log(error)
            }
        }

        return <Registration {...this.props} registration={registration}/>;
    }
}

const mapStateToProps = (state) => ({
    isRegistered: state.auth.isRegistered
})

export default connect(mapStateToProps, {userRegistration})(RegistrationContainer)
