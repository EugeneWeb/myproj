import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'


const MyPostsContainer = (props) => {
    const state = props.store.getState()
    const posts = state.profilePage.posts
    const newPostText = state.profilePage.newPostText 
    
    const addPost = () => {
        props.store.dispatch(addPostActionCreator())
    }
    const updateNewPostText = (postText) => {
        props.store.dispatch(updateNewPostTextActionCreator(postText))
    }

    return <MyPosts posts={posts} newPostText={newPostText} updateNewPostText={updateNewPostText} addPost={addPost}/>
}

export default MyPostsContainer