import s from './Post.module.css'
import likeIcon from './img/like_icon.svg'

const Post = ({path, text, likesCount}) => {
    return (
        <div className={s.post}>
            <div className={s.img__wrap}>
                <img src={path} alt="Картинка комментария" />
            </div>

            <p className={s.text}>{text}</p>

            <div className={s.likes}>
                <div className={s.likes__icon}>
                    <img src={likeIcon} alt="Иконка мне нравится" />
                </div>
                <p className="likes__text">{likesCount}</p>
            </div>
        </div>
    )
}

export default Post