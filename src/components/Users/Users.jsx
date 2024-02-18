import s from "./Users.module.css";
import React from "react";
import { Paginator } from "../common/Paginator/Paginator";
import User from "./User/User";

const Users = (props) => {
    return (
        <div className={`${s.users} ${props.isFetching ? s.hidden : null}`}>
            <h1 className={s.users__title}>Пользователи</h1>

            <ul className={s.users__items}>
                {props.users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        currentUser={props.currentUser}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow}
                    />
                ))}
            </ul>

            <Paginator
                totalItemsCount={props.totalCount}
                perPage={props.perPage}
                currentPage={props.currentPage}
                onChangePage={props.onChangePage}
            />
        </div>
    );
};

export default Users;
