import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo />
            <MyPosts posts={props.profilePage.posts} addPost={props.profilePage.addPost} updateNewPostText={props.profilePage.updateNewPostText} newPostText={props.profilePage.newPostText}/>
        </div>
    )
}

export default Profile