import s from "./Friend.module.css";

const Friend = ({path, name}) => {
    return (
        <div className={s.friend}>
            <div className={s.img__wrap}>
                <img src={path} alt="Иконка пользователя" />
            </div>
            <p className={s.name}>{name}</p>
        </div>
    );
};

export default Friend;
