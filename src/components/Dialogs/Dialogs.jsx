import s from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogsItem'
import Message from './Message/Message'


const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <ul className={s.dialogs__items}>
                {props.dialogsPage.dialogs.map((dialog, index) => <DialogsItem key={index} id={dialog.id}  name={dialog.name} path={dialog.path}/>)}
            </ul>

            <ul className={s.messages}>
                {props.dialogsPage.messages.map((message, index) => <Message key={index} message={message.text} />)}
            </ul>
        </div>
    )
}

export default Dialogs