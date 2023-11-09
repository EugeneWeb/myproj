import React from "react";
import s from "./Dialogs.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";

import sendIcon from "./icons/send_icon.svg";
import { Field, reduxForm } from "redux-form";
import { maxLength } from "../../utils/validators";
import { Textarea } from "../common/FormControls/FormControls";

const Dialogs = ({sendMessage, dialogs, messages}) => {

    const onSubmit = (formData) => {
        sendMessage(formData.messageText)
    }

    return (
        <div className={s.dialogs}>
            <ul className={s.dialogs__items}>
                {dialogs.map((dialog, index) => (
                    <DialogsItem
                        key={index}
                        id={dialog.id}
                        name={dialog.name}
                        path={dialog.path}
                    />
                ))}
            </ul>

            <div className={s.messages}>
                <ul className={s.messages__items}>
                    {messages.map((message, index) => (
                        <Message key={index} message={message.text} />
                    ))}
                </ul>

                <MessageReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
};

const messageForm = ({handleSubmit}) => {
    const maxLength300 = maxLength(300) 
    return (
        <form onSubmit={handleSubmit} id={s.messageForm}>
            <Field className={s.message__input} name="messageText" elementtype="textarea" component={Textarea} validate={[ maxLength300]} />

            <button
                type="submit"
                className={s.message__btn}
            >
                <img src={sendIcon} alt="Иконка отправить" />
            </button>
        </form>
    );
};

const MessageReduxForm = reduxForm({form:'message'})(messageForm)

export default Dialogs;
