import s from './Friend.module.css'

const Friend = (props) => {
    return (
        <div className={s.friend}>
            <div className={s.img__wrap}>
                <img src={props.path} alt="Иконка пользователя" />
            </div>
            <p className={s.name}>{props.name}</p>
        </div>
    )
}

export default Friend