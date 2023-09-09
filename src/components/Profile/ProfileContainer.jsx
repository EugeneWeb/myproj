import React from 'react'
import WithRouter from '../common/WithRouter/WithRouter'
import { connect } from 'react-redux'
import Profile from './Profile'
import { setUsersProfile } from '../../redux/profile-reducer'
import { api } from '../../api/api'

class ProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.params.userId
        if(!userId) {
            return
        }

        api.setProfile(userId)
              .then(resp => {
                this.props.setUsersProfile(resp)
              })
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

const WithRouterComponent = WithRouter(ProfileContainer)


const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    currentUser: state.auth.currentUser,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { setUsersProfile })(WithRouterComponent)