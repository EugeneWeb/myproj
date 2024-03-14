import { connect } from 'react-redux'
import Header from './Header'
import {authActions} from '../../redux/authReducer'
import { getCurrentUser, getIsAuth } from '../../redux/auth-selectors'
import { AppStateType } from '@redux/redux-store'

const mapStateToProps = (state) =>({
    isAuth: getIsAuth(state),
    currentUser: getCurrentUser(state)
})

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = typeof MDTP
type OwnPropsType = {
    notAuthClassName: string
}

const MDTP = {setLogout: authActions.setLogout}
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, MDTP)(Header)