import React, { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/authReducer'
import { Navigate } from 'react-router-dom'
import { getIsAuth } from '../../redux/auth-selectors'


class LoginContainer extends Component {
  render() {
    const login = (login, password) => {
      this.props.loginUser(login, password)
    }
      if(this.props.isAuth) return <Navigate to='/profile' />
    return (
      <Login {...this.props} login={login}/>
    )
  }
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state)
})

export default connect(mapStateToProps, {loginUser})(LoginContainer)

