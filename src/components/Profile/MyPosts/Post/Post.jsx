import s from './Post.module.css'
import likeIcon from './img/like_icon.svg'

const Post = (props) => {
    return (
        <div className={s.post}>
            <div className={s.img__wrap}>
                <img src={props.path} alt="Картинка комментария" />
            </div>

            <p className={s.text}>{props.text}</p>

            <div className={s.likes}>
                <div className={s.likes__icon}>
                    <img src={likeIcon} alt="Иконка мне нравится" />
                </div>
                <p className="likes__text">{props.likesCount}</p>
            </div>
        </div>
    )
}

export default Post