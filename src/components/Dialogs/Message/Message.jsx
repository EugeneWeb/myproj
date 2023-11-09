import s from './Message.module.css'

const Message = ({message}) => {
    return (
        <div className={s.message}>
            <p className="text">{message}</p>
        </div>
    )
}

export default Message