
import { FC } from 'react';
import s from './User.module.css'
import { NavLink } from "react-router-dom";
import { ProfileType, UserType } from 'types/types';

type PropsType = {
    user: UserType
    follow: (userId: string) => void
    unfollow: (userIt: string) => void
    currentUser: ProfileType
    followingInProgress: string[]
}
const User:FC<PropsType> = ({user, follow, unfollow, currentUser, followingInProgress}) => {
  return (
    <li className={s.item}>
                        <div className={s.avatar}>
                            <div className={s.img__wrap}>
                                <NavLink to={`/profile/${user._id}`}>
                                    <img
                                        src={user.photoUrl}
                                        alt={`Фото ${user.fullname}`}
                                    />
                                </NavLink>
                            </div>
                            {currentUser.following.some(
                                (id) => id === user._id
                            ) ? (
                                <button
                                    disabled={followingInProgress.some(
                                        (id) => id === user._id
                                    )}
                                    onClick={() => {
                                        unfollow(user._id);
                                    }}
                                    className={s.follow}
                                >
                                    Отписаться
                                </button>
                            ) : (
                                <button
                                    disabled={followingInProgress.some(
                                        (id) => id === user._id
                                    )}
                                    onClick={() => {
                                        follow(user._id);
                                    }}
                                    className={s.follow}
                                >
                                    Подписаться
                                </button>
                            )}
                        </div>

                        <div className={s.info}>
                            <div className={s.info__line}>
                                <p className={s.fullname}>{user.fullname}</p>
                                <p
                                    className={s.location}
                                >{`${user.location.country}, ${user.location.city}`}</p>
                            </div>

                            <div className={s.status}>{user.status}</div>
                        </div>
                    </li>
  )
}

export default User
