import React from 'react'
import WithRouter from '../common/WithRouter/WithRouter'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getProfile } from '../../redux/users-reducer'
import { setUsersProfile } from '../../redux/profile-reducer'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getStatus } from '../../redux/authReducer'

class ProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.params.userId
        if(!userId) {
            if(this.props.currentUser) this.props.setUsersProfile(this.props.currentUser)
            return
        }
        this.props.getProfile(userId)
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

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    currentUser: state.auth.currentUser
})

export default compose(
    connect(mapStateToProps, { getProfile, setUsersProfile, getStatus }),
    withAuthRedirect,
    WithRouter
)(
    ProfileContainer
)