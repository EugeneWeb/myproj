import React, { Component } from 'react'
import {setUser} from '../../redux/authReducer'
import axios from 'axios'
import Login from './Login'
import { connect } from 'react-redux'


class LoginContainer extends Component {
  render() {
    const login = (login, password) => {
        axios
             .post('http://127.0.0.1:5000/api/user/login', {login, password})
             .then(userAuth => {
                this.props.setUser(userAuth.data.user)
                localStorage.setItem('token', userAuth.data.token)
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

