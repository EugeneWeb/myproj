import React from "react";
import s from "./Dialogs.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";

import sendIcon from "./icons/send_icon.svg";
import { Field, reduxForm } from "redux-form";
import { maxLength } from "../../utils/validators";
import { Textarea } from "../common/FormControls/FormControls";

const Dialogs = (props) => {
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // };

    // const handleMessageBodyChange = (e) => {
    //     props.updateNewMessageBody(e.target.value);
    // };

    // const handleSendMessage = () => {
    //     props.sendMessage();
    // };

    const onSubmit = (formData) => {
        props.sendMessage(formData.messageText)
    }

    return (
        <div className={s.dialogs}>
            <ul className={s.dialogs__items}>
                {props.dialogs.map((dialog, index) => (
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
                    {props.messages.map((message, index) => (
                        <Message key={index} message={message.text} />
                    ))}
                </ul>

                {/* <form onSubmit={handleSubmit} id={s.messageForm}>
                    <textarea
                        value={props.newMessageBody}
                        onChange={handleMessageBodyChange}
                        className={s.message__input}
                    ></textarea>
                    <button
                        onClick={handleSendMessage}
                        type="submit"
                        className={s.message__btn}
                    >
                        <img src={sendIcon} alt="Иконка отправить" />
                    </button>
                </form> */}
                <MessageReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
};

const messageForm = (props) => {
    const maxLength300 = maxLength(300) 
    return (
        <form onSubmit={props.handleSubmit} id={s.messageForm}>
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
