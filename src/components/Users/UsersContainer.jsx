import { connect } from "react-redux";
import {
    setCurrentPage,
    setIsFetching,
    setUsers,
    setUsersTotalCount,
    setFollowingInProgress,
    deleteFollowingInProgress,
    requestUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import s from "./UsersContainer.module.css";
import {
    followSuccess,
    unfollowSuccess,
    follow,
    unfollow,
} from "../../redux/authReducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPerPage, getTotalCount, getUsersSuper } from "../../redux/users-selectors";
import { getCurrentUser } from "../../redux/auth-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        const {perPage, currentPage} = this.props
        this.props.requestUsers(perPage, currentPage);
    }

    render() {
        // Вычитаем одного из totalCount, потому что себя не считаем
        const pagesCount = Math.ceil(
            this.props.totalCount / this.props.perPage
        );
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        const onChangePage = (pageNum) => {
            const {perPage} = this.props
            this.props.requestUsers(perPage, pageNum);
        };

        return (
            <div className={s.wrap}>
                {this.props.isFetching ? (
                    <Preloader className={s.preloader} />
                ) : null}
                <Users
                    isFetching={this.props.isFetching}
                    users={this.props.users}
                    onChangePage={onChangePage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    pages={pages}
                    currentPage={this.props.currentPage}
                    currentUser={this.props.currentUser}
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

const mapStateToProps = (state) => {
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



export default compose(
    connect(mapStateToProps, {
        followSuccess,
        unfollowSuccess,
        setUsers,
        setUsersTotalCount,
        setCurrentPage,
        setIsFetching,
        setFollowingInProgress,
        deleteFollowingInProgress,
        requestUsers,
        follow,
        unfollow,
    }),
    withAuthRedirect
)(UsersContainer);
