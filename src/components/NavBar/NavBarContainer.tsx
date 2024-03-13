
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { getIsAuth } from "../../redux/auth-selectors";
import { FC } from "react";
import { AppStateType } from "@redux/redux-store";

type MapStatePropsType = ReturnType<typeof mapStateToProps> 
type MapDispatchPropsType = {}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
const NavBarContainer: FC<PropsType> = (props) => {
    return <NavBar {...props} />
};

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state)
})

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, null)(NavBarContainer);
