import s from './DialogsItem.module.css'
import { NavLink } from 'react-router-dom'

const DialogsItem = (props) => {
    return (
        <li className={s.dialogsitem}>
            <NavLink to={`/messages/${props.id}`} className={({isActive}) => isActive ? `${s.active} ${s.dialog__link}` : s.dialog__link }>{props.name}</NavLink>
        </li>
    )
}

export default DialogsItem