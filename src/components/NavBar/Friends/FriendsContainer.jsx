import { connect } from "react-redux";
import Friends from "./Friends";

const mapStateToProps = (state) => ({
    friends: state.navBarPage.friends
})
const mapDispatchToProps = (dispatch) => ({
    
})


const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)

export default FriendsContainer