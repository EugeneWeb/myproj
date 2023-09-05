import React from 'react'
import axios from 'axios'
import WithRouter from '../common/WithRouter/WithRouter'
import { connect } from 'react-redux'
import Profile from './Profile'
import { setUsersProfile } from '../../redux/profile-reducer'

class ProfileContainer extends React.Component {
    
    componentDidMount() {
        
        const userId = this.props.params.userId
        axios
              .get('http://127.0.0.1:5000/api/user/' + userId)
              .then(resp => {
                this.props.setUsersProfile(resp.data)
              })
    }

    render() {
        return <Profile {...this.props} />
    }
}

const WithRouterComponent = WithRouter(ProfileContainer)


const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, { setUsersProfile })(WithRouterComponent)