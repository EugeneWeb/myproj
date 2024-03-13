import s from "./Users.module.css";
import * as React from "react";
import { Paginator } from "../common/Paginator/Paginator";
import User from "./User/User";
import { ProfileType, UserType } from "types/types";
import { deleteFollowingInProgress, setFollowingInProgress } from "@redux/users-reducer";

type PropsType = {
    isFetching: boolean
    users: UserType[]
    currentUser: ProfileType,
    followingInProgress: string[]
    totalCount: number
    perPage: number
    currentPage: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onChangePage: (pageNum: number) => void
    deleteFollowingInProgress: typeof deleteFollowingInProgress
    setFollowingInProgress: typeof setFollowingInProgress
}
const Users: React.FC<PropsType> = ({isFetching, users, currentUser, followingInProgress, setFollowingInProgress, deleteFollowingInProgress,
    follow, unfollow, totalCount, perPage, currentPage, onChangePage}) => {
    return (
        <div className={`${s.users} ${isFetching ? s.hidden : null}`}>
            <h1 className={s.users__title}>Пользователи</h1>

            <ul className={s.users__items}>
                {users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        currentUser={currentUser}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        follow={follow}
                    />
                ))}
            </ul>

            <Paginator
                totalItemsCount={totalCount}
                perPage={perPage}
                currentPage={currentPage}
                onChangePage={onChangePage}
                portionSize={5}
            />
        </div>
    );
};

export default Users;
