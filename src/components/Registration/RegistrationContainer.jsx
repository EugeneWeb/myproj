import { connect } from "react-redux";
import Registration from "./Registration";
import React from "react";
import {setIsRegistered} from './../../redux/authReducer'
import { api } from "../../api/api";

class RegistrationContainer extends React.Component {
    render() {
        const registration = (username, email, password) => {
            try {
                this.props.setIsRegistered(false)
                api.registration(username, email, password)
                      .then(regMsg => {
                        this.props.setIsRegistered(true)
                      })
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

export default connect(mapStateToProps, {setIsRegistered})(RegistrationContainer)
