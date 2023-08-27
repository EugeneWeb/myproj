import s from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogsItem'
import Message from './Message/Message'


const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <ul className={s.dialogs__items}>
                {props.dialogs.map(dialog => <DialogsItem id={dialog.id}  name={dialog.name}/>)}
            </ul>

            <ul className={s.messages}>
                {props.messages.map(message => <Message message={message.text} />)}
            </ul>
        </div>
    )
}

export default Dialogs