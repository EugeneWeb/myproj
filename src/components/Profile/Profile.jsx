import s from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../common/Preloader/Preloader'

const Profile = ({profile, getStatus}) => {
    
    if(!profile) {
        return <Preloader />
    }
    
    return (
        <div className={s.profile}>
            <ProfileInfo profile={profile} getStatus={getStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile