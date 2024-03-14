import * as React from 'react'
import WithRouter from '../common/WithRouter/WithRouter'
import { connect } from 'react-redux'
import Profile from './Profile'
import { requestProfile } from '../../redux/users-reducer'
import { profileActions } from '../../redux/profile-reducer'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getStatus } from '../../redux/authReducer'
import { getCurrentUser } from '../../redux/auth-selectors'
import { getProfile } from '../../redux/profile-selectors'
import { AppStateType } from '@redux/redux-store'
import { Params } from 'react-router-dom'
import { ProfileType } from 'types/types'

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = typeof MDTP
type OwnPropsType = {
    params: Readonly<Params<string>>
    isAuth: boolean
}

type PropsType = MapStatePropsType & OwnPropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        const userId = this.props.params.userId
        if(!userId) {
            if(this.props.currentUser) this.props.setUsersProfile(this.props.currentUser)
            return
        }
        this.props.requestProfile(userId)
    }
    componentDidUpdate(prevProps) {
        if (this.props.isAuth !== prevProps.isAuth && this.props.isAuth) {
            // Только если isAuth изменился с false на true
            this.props.setUsersProfile(this.props.currentUser);
          }
          
        // Для того, чтобы при переходе с аккаунта другого user'а мы получили нашу страницу на '/profile' мы обновляем данные(т.е при переходе с /profile/skdfjkfd на /profile у нас будет происходить обновление данных)
        if (prevProps.params.userId && !this.props.params.userId) {
            this.props.setUsersProfile(this.props.currentUser);
        }
    }

    render() {
        return <Profile {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: getProfile(state) as ProfileType,
    currentUser: getCurrentUser(state)
})

const MDTP = { 
    requestProfile, 
    setUsersProfile: profileActions.setUsersProfile, 
    getStatus }

export default compose<React.ComponentType>(
    connect(mapStateToProps, MDTP),
    withAuthRedirect,
    WithRouter
)(
    ProfileContainer
)