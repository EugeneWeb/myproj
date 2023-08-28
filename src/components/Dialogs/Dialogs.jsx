import React from "react";
import s from "./Dialogs.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";

import sendIcon from "./icons/send_icon.svg";

const Dialogs = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={s.dialogs}>
            <ul className={s.dialogs__items}>
                {props.dialogsPage.dialogs.map((dialog, index) => (
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
                    {props.dialogsPage.messages.map((message, index) => (
                        <Message key={index} message={message.text} />
                    ))}
                </ul>

                <form onSubmit={handleSubmit} id={s.messageForm}>
                    <textarea className={s.message__input}></textarea>
                    <button type="submit" className={s.message__btn}>
                        <img src={sendIcon} alt="Иконка отправить" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dialogs;
