import { connect } from "react-redux";
import {
    follow,
    setCurrentPage,
    setIsFetching,
    setUsers,
    setUsersTotalCount,
    unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import axios from "axios";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import s from "./UsersContainer.module.css";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        
        axios
            .get(
                `http://127.0.0.1:5000/api/users/?perPage=${this.props.perPage}&page=${this.props.currentPage}`
            )
            .then((resp) => {
                this.props.setIsFetching(false);

                this.props.setUsers(resp.data.users);
                this.props.setUsersTotalCount(resp.data.totalCount);
            });
    }

    render() {
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
            axios
                .get(
                    `http://127.0.0.1:5000/api/users/?perPage=${this.props.perPage}&page=${pageNum}`
                )
                .then((resp) => {
                    this.props.setIsFetching(false);

                    this.props.setUsers(resp.data.users);
                });
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
                /> 
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
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(follow(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollow(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsers(users));
//         },
//         setUsersTotalCount: (totalCount) => {
//             dispatch(setUsersTotalCount(totalCount));
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPage(currentPage));
//         },
//         setIsFetching: (isFetching) => {
//             dispatch(setIsFetching(isFetching));
//         },
//     };
// };

export default connect(mapStateToProps, {follow, unfollow, setUsers, setUsersTotalCount, setCurrentPage, setIsFetching })(UsersContainer);
