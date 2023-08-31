import { connect } from 'react-redux'
// import StoreContext from '../../../StoreContext'
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer'
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
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
})
const mapDispatchToProps = (dispatch) => ({
    addPost: () => {
        dispatch(addPostActionCreator())
    },
    updateNewPostText: (postText) => {
        dispatch(updateNewPostTextActionCreator(postText))
    }
})

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer