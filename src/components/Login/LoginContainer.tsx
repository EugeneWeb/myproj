import { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/authReducer'
import { Navigate } from 'react-router-dom'
import { getIsAuth } from '../../redux/auth-selectors'
import { AppStateType } from '@redux/redux-store'

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  loginUser: (login: string, password: string) => void
}
type OwnPropsType = {}
type PropsType =  MapStatePropsType & MapDispatchPropsType & OwnPropsType

class LoginContainer extends Component<PropsType> {
  render() {
    const login = (login: string, password: string) => {
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

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {loginUser})(LoginContainer)

