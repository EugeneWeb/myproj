import React, { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/authReducer'


class LoginContainer extends Component {
  render() {
    const login = (login, password) => {
      this.props.loginUser(login, password)
    }

    return (
      <Login {...this.props} login={login}/>
    )
  }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {loginUser})(LoginContainer)

