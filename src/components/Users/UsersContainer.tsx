import { connect } from "react-redux";
import {
    usersActions,
    requestUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import * as React from 'react';
import Preloader from "../common/Preloader/Preloader";
import s from "./UsersContainer.module.css";
import {
    authActions, follow, unfollow
} from "../../redux/authReducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPerPage, getTotalCount, getUsersSuper } from "../../redux/users-selectors";
import { getCurrentUser } from "../../redux/auth-selectors";
import { AppStateType } from "@redux/redux-store";
import { ProfileType, UserType } from "types/types";

type MapStatePropsType = {
    users: UserType[],
    currentPage: number,
    totalCount: number,
    perPage: number,
    isFetching: boolean,
    currentUser: ProfileType | {},
    followingInProgress: string[]
}
// type GetDispatchTypes<T extends {[propName: string]: (...args: any) => any}> = T extends {[propName: string]: infer U} ? U : never
type MapDispatchPropsType = typeof MDTP
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType



class UsersContainer extends React.Component<PropsType> {
    
    componentDidMount() {
        
        const {perPage, currentPage} = this.props
        this.props.requestUsers(perPage, currentPage);
    }

    render() {
        

        const onChangePage = (pageNum) => {
            const {perPage} = this.props
            this.props.requestUsers(perPage, pageNum);
        };
        
        return (
            <div className={s.wrap}>
                {this.props.isFetching ? (
                    <Preloader />
                ) : null}
                <Users
                    totalCount={this.props.totalCount}
                    perPage={this.props.perPage}
                    isFetching={this.props.isFetching}
                    users={this.props.users}
                    onChangePage={onChangePage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    currentPage={this.props.currentPage}
                    currentUser={this.props.currentUser as ProfileType}
                    followingInProgress={this.props.followingInProgress}
                    setFollowingInProgress={this.props.setFollowingInProgress}
                    deleteFollowingInProgress={
                        this.props.deleteFollowingInProgress
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersSuper(state),
        currentPage: getCurrentPage(state),
        totalCount: getTotalCount(state),
        perPage: getPerPage(state),
        isFetching: getIsFetching(state),
        currentUser: getCurrentUser(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

const MDTP = {
    followSuccess: authActions.followSuccess,
    unfollowSuccess: authActions.unfollowSuccess,
    setUsers: usersActions.setUsers,
    setUsersTotalCount: usersActions.setUsersTotalCount,
    setCurrentPage: usersActions.setCurrentPage,
    setIsFetching: usersActions.setIsFetching,
    setFollowingInProgress: usersActions.setFollowingInProgress,
    deleteFollowingInProgress: usersActions.deleteFollowingInProgress,
    requestUsers,
    follow,
    unfollow,
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, MDTP),
    withAuthRedirect
)(UsersContainer);
