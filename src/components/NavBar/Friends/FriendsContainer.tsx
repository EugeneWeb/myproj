import { connect } from "react-redux";
import Friends from "./Friends";
import { AppStateType } from "@redux/redux-store";

const mapStateToProps = (state: AppStateType) => ({
    friends: state.navBarPage.friends
})


type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const FriendsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {})(Friends)

export default FriendsContainer