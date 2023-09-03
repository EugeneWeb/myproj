import axios from "axios";
import s from "./Users.module.css";
import React from "react";

class Users extends React.Component {
    componentDidMount() {
        axios
             .get(`http://127.0.0.1:5000/api/users/?perPage=${this.props.perPage}&page=${this.props.currentPage}`)
             .then(resp => {
                this.props.setUsers(resp.data.users)
                this.props.setUsersTotalCount(resp.data.totalCount)
             })
    }



    render() {
        // Используем ceil для округления в большую сторону
        // узнаём общее количество страниц
        const pagesCount = Math.ceil(this.props.totalCount / this.props.perPage)
        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        // Т.е для того, чтобы получить номер страницы page мы замыкаем его в стрелочной функции обработчике onClick и вызываем onChangePage внутри стрелочной функции onClick
        const onChangePage = (pageNum) => {
            this.props.setCurrentPage(pageNum)
            axios
             .get(`http://127.0.0.1:5000/api/users/?perPage=${this.props.perPage}&page=${pageNum}`)
             .then(resp => {
                this.props.setUsers(resp.data.users)
             })
        }

        return (
            <div className={s.users}>
                <h1 className={s.users__title}>Пользователи</h1>

                <ul className={s.users__items}>
                    {this.props.users.map((user) => (
                        <li key={user._id} className={s.item}>
                            <div className={s.avatar}>
                                <div className={s.img__wrap}>
                                    <img
                                        src={user.photoUrl}
                                        alt={`Фото ${user.fullname}`}
                                    />
                                </div>
                                {user.followed ? (
                                    <button
                                        onClick={() => this.props.follow(user.id)}
                                        className={s.follow}
                                    >
                                        Отписаться
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => this.props.unfollow(user.id)}
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
                        pages.map(pageNum => <button className={this.props.currentPage === pageNum ? `${s.selectedPage} ${s.pageBtn}`: s.pageBtn} key={pageNum} onClick={() => { onChangePage(pageNum)}}>{pageNum}</button>)
                    }
                </div>
            </div>
        );
    }
}

export default Users;
