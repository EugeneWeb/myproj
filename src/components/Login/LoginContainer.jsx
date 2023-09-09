import React, { Component } from 'react'
import {setUser} from '../../redux/authReducer'
import Login from './Login'
import { connect } from 'react-redux'
import { api } from '../../api/api'


class LoginContainer extends Component {
  render() {
    const login = (login, password) => {
        api.login(login, password)
             .then(userAuth => {
                this.props.setUser(userAuth.user)
                localStorage.setItem('token', userAuth.token)
             })
    }

    return (
      <Login {...this.props} login={login}/>
    )
  }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {setUser})(LoginContainer)

