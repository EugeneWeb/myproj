import { FC } from 'react'
import s from './Message.module.css'

type PropsType = {
    message: string
}
const Message: FC<PropsType> = ({message}) => {
    return (
        <div className={s.message}>
            <p className="text">{message}</p>
        </div>
    )
}

export default Message