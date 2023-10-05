
import { connect } from "react-redux";
import NavBar from "./NavBar";

const NavBarContainer = (props) => {
    return <NavBar {...props} />
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, null)(NavBarContainer);
