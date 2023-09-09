import s from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../common/Preloader/Preloader'

const Profile = (props) => {
    // Если свойства profile нет, то будет загрузка и ожидание ответа от сервера
    
    if(!props.profile) {
        return <Preloader />
    }

    return (
        <div className={s.profile}>
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile