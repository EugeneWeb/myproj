import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

const withAuthRedirect = (Component) => {
    
    const withAuthRedirectWrapper = (props) => {
        if(!props.isAuth) { return <Navigate to='/login' />}
        return <Component {...props} />
    }

    return connect(mapStateToProps, {})(withAuthRedirectWrapper)
}

export default withAuthRedirect