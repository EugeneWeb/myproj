
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { getIsAuth } from "../../redux/auth-selectors";

const NavBarContainer = (props) => {
    return <NavBar {...props} />
};

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state)
})

export default connect(mapStateToProps, null)(NavBarContainer);
