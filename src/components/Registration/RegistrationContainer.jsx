import { connect } from "react-redux";
import Registration from "./Registration";
import React from "react";
import axios from "axios";
import {setIsRegistered} from './../../redux/authReducer'

class RegistrationContainer extends React.Component {
    render() {
        const registration = (username, email, password) => {
            try {
                this.props.setIsRegistered(false)
                axios
                      .post('http://127.0.0.1:5000/api/user/registration', {username, email, password})
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
