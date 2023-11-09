import { connect } from 'react-redux'
// import StoreContext from '../../../StoreContext'
import { addPost } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import { getPosts } from '../../../redux/profile-selectors'

const mapStateToProps = (state) => ({
    posts: getPosts(state)
})

const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)

export default MyPostsContainer