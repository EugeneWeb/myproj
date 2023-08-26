import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.post}>
            <div className={s.img__wrap}>
                <img src={props.path} alt="Картинка комментария" />
            </div>

            <p className={s.text}>{props.text}</p>
        </div>
    )
}

export default Post