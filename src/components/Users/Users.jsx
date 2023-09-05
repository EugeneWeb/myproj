import s from "./Users.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Users = (props) => {
    return (
        <div className={`${s.users} ${props.isFetching ? s.hidden : null}`}>
                <h1 className={s.users__title}>Пользователи</h1>

                <ul className={s.users__items}>
                    {props.users.map((user) => (
                        <li key={user._id} className={s.item}>
                            <div className={s.avatar}>
                                <div className={s.img__wrap}>
                                    <NavLink to={`/profile/${user._id}`}>
                                        <img
                                            src={user.photoUrl}
                                            alt={`Фото ${user.fullname}`}
                                        />
                                    </NavLink>
                                </div>
                                {user.followed ? (
                                    <button
                                        onClick={() => props.follow(user.id)}
                                        className={s.follow}
                                    >
                                        Отписаться
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => props.unfollow(user.id)}
                                        className={s.follow}
                                    >
                                        Подписаться
                                    </button>
                                )}
                            </div>

                            <div className={s.info}>
                                <div className={s.info__line}>
                                    <p className={s.fullname}>
                                        {user.fullname}
                                    </p>
                                    <p
                                        className={s.location}
                                    >{`${user.location.country}, ${user.location.city}`}</p>
                                </div>

                                <div className={s.status}>{user.status}</div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className={s.pagination}>
                    {
                        props.pages.map(pageNum => <button className={props.currentPage === pageNum ? `${s.selectedPage} ${s.pageBtn}`: s.pageBtn} key={pageNum} onClick={() => { props.onChangePage(pageNum)}}>{pageNum}</button>)
                    }
                </div>
            </div>
    )
}

export default Users;
