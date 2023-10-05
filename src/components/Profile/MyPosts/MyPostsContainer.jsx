import { connect } from 'react-redux'
// import StoreContext from '../../../StoreContext'
import { addPost } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'


// const MyPostsContainer = (props) => {
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 const state = store.getState()
//                 const posts = state.profilePage.posts
//                 const newPostText = state.profilePage.newPostText 
                
//                 const addPost = () => {
//                     store.dispatch(addPostActionCreator())
//                 }
//                 const updateNewPostText = (postText) => {
//                     store.dispatch(updateNewPostTextActionCreator(postText))
//                 }

//                 return (<MyPosts posts={posts} newPostText={newPostText} updateNewPostText={updateNewPostText} addPost={addPost}/>)
//             } 
//             }
//         </StoreContext.Consumer>
//     )
// }

const mapStateToProps = (state) => ({
    posts: state.profilePage.posts
})


const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)

export default MyPostsContainer