import { connect } from 'react-redux'
import Header from './Header'
import {setLogout} from '../../redux/authReducer'
import { getCurrentUser, getIsAuth } from '../../redux/auth-selectors'

const mapStateToProps = (state) =>({
    isAuth: getIsAuth(state),
    currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps, {setLogout})(Header)