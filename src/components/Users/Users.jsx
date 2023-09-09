import s from "./Users.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'

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
                                {props.currentUser.following.some(id => id === user._id) ? (
                                    <button
                                        onClick={() =>{
                                            
                                            axios.delete(`http://127.0.0.1:5000/api/user/unfollow/${user._id}`, {headers: {Authorization:localStorage.getItem('token')}})
                                                  .then(resp => {
                                                    
                                                    if(resp.data.resultCode === 0) {
                                                        props.follow(user._id)
                                                    }
                                                })
                                        }}
                                        className={s.follow}
                                    >
                                        Отписаться
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>{
                                            axios.post(`http://127.0.0.1:5000/api/user/follow/${user._id}`, {},{headers: {Authorization:localStorage.getItem('token')}})
                                                  .then(resp => {
                                                    
                                                    if(resp.data.resultCode === 0) {
                                                        props.unfollow(user._id)
                                                    }
                                                })
                                        }}
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
