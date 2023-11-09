import s from './DialogsItem.module.css'
import { NavLink } from 'react-router-dom'

const DialogsItem = ({id, path, name}) => {
    return (
        <li className={s.dialogsitem}>
            <NavLink to={`/messages/${id}`} className={({isActive}) => isActive ? `${s.active} ${s.dialog__link}` : s.dialog__link }>
                <div className={s.img__wrap}>
                    <img src={path} alt="Лого пользователя" />
                </div>
                <p>{name}</p>
            </NavLink>
        </li>
    )
}

export default DialogsItem