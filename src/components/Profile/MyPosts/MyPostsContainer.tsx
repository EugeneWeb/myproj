import { connect } from 'react-redux'
// import StoreContext from '../../../StoreContext'
import { addPost } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import { getPosts } from '../../../redux/profile-selectors'
import { AppStateType } from '@redux/redux-store'

const mapStateToProps = (state) => ({
    posts: getPosts(state)
})

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = typeof MDTP
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const MDTP = {
    addPost
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, MDTP)(MyPosts)

export default MyPostsContainer