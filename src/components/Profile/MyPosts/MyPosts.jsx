import s from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {
    return (
        <div>
            <h2 className={s.title}>Мои посты</h2>

            <form id={s.addNews}>
                <textarea placeholder='Ваша новость...'></textarea>
                <div className={s.addNews__btn}>
                    <button>Отправить</button>
                </div> 
            </form>

            <ul className="posts">
                {props.images.map((img, index) => <Post key={index} path={`${img.path}`} text={img.text} likesCount={img.likesCount}/>)}
            </ul>
        </div>
    )
}

export default MyPosts