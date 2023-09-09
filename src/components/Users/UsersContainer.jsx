import { connect } from "react-redux";
import {
    setCurrentPage,
    setIsFetching,
    setUsers,
    setUsersTotalCount
} from "../../redux/users-reducer";
import Users from "./Users";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import s from "./UsersContainer.module.css";
import {follow, unfollow} from '../../redux/authReducer'
import { api } from "../../api/api";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);

        api.getUsers(this.props.perPage, this.props.currentPage)
            .then((resp) => {
                this.props.setIsFetching(false);

                this.props.setUsers(resp.users);
                this.props.setUsersTotalCount(resp.totalCount);
            });
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
            this.props.setIsFetching(true);

            this.props.setCurrentPage(pageNum);
            api.getUsers(this.props.perPage, pageNum)
                .then((resp) => {
                    this.props.setIsFetching(false);

                    this.props.setUsers(resp.users);
                });
        };

        return (
            <div className={s.wrap}>
                {this.props.isAuth ? (
                    <div>
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
                        />
                    </div>
                ) : <h1>Вы не авторизованы</h1>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        totalCount: state.usersPage.totalCount,
        perPage: state.usersPage.perPage,
        isFetching: state.usersPage.isFetching,
        isAuth: state.auth.isAuth,
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setUsersTotalCount,
    setCurrentPage,
    setIsFetching,
})(UsersContainer);
