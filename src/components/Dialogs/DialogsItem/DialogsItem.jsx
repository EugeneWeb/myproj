import s from './DialogsItem.module.css'
import { NavLink } from 'react-router-dom'

const DialogsItem = (props) => {
    return (
        <li className={s.dialogsitem}>
            <NavLink to={`/messages/${props.id}`} className={({isActive}) => isActive ? `${s.active} ${s.dialog__link}` : s.dialog__link }>
                <div className={s.img__wrap}>
                    <img src={props.path} alt="Лого пользователя" />
                </div>
                <p>{props.name}</p>
            </NavLink>
        </li>
    )
}

export default DialogsItem