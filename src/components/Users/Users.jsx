import s from './Users.module.css'

const Users = (props) => {
    if(props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                fullname: "Дмитрий Сорокин",
                location: { city: "Минск", country: "Беларусь" },
                status: "Я ищу работу",
                followed: true,
                photoUrl: "./img/avatars/avatar1.svg",
            },
            {
                id: 2,
                fullname: "Дмитрий Сорокин",
                location: { city: "Минск", country: "Беларусь" },
                status: "Я ищу работу",
                followed: false,
                photoUrl: "./img/avatars/avatar1.svg",
            },
            {
                id: 3,
                fullname: "Aлександр Сорокин",
                location: { city: "Минск", country: "Беларусь" },
                status: "Я ищу работу",
                followed: true,
                photoUrl: "./img/avatars/avatar1.svg",
            },
            {
                id: 4,
                fullname: "Aлександр Сорокин",
                location: { city: "Минск", country: "Беларусь" },
                status: "Я ищу работу",
                followed: true,
                photoUrl: "./img/avatars/avatar1.svg",
            }
        ])
    }

    return(
        <div className={s.users}>
            <h1 className={s.users__title}>Пользователи</h1>

            <ul className={s.users__items}>
                    {
                        props.users.map(user => (
                            <li key={user.id} className={s.item}>
                                <div className={s.avatar}>
                                    <div className={s.img__wrap}>
                                        <img src={user.photoUrl} alt={`Фото ${user.fullname}`} />
                                    </div>
                                    {
                                        user.followed ?
                                        <button onClick={() => props.follow(user.id)} className={s.follow}>Отписаться</button>
                                        :
                                        <button onClick={() => props.unfollow(user.id)} className={s.follow}>Подписаться</button>
                                    }
                                </div>

                                <div className={s.info}>
                                    <div className={s.info__line}>
                                        <p className={s.fullname}>{user.fullname}</p>
                                        <p className={s.location}>{`${user.location.country}, ${user.location.city}`}</p>
                                    </div>

                                    <div className={s.status}>{user.status}</div>
                                </div>

                            </li>
                        ))
                    }
            </ul>

            <div className={s.btn__wrapper}>
                <button >Показать больше</button>
            </div>
        </div>
    )
}

export default Users