import { connect } from 'react-redux'
import Header from './Header'
import {setLogout} from '../../redux/authReducer'

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth,
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, {setLogout})(Header)