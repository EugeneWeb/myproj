import s from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../common/Preloader/Preloader'
import { ProfileType } from 'types/types'
import { FC } from 'react'

type PropsType = {
    profile: ProfileType,
    getStatus: (status: string) => void
}
const Profile: FC<PropsType> = ({profile, getStatus}) => {
    
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