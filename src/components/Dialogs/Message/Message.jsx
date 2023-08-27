import s from './Message.module.css'

const Message = (props) => {
    return (
        <div className={s.message}>
            <p className="text">{props.message}</p>
        </div>
    )
}

export default Message