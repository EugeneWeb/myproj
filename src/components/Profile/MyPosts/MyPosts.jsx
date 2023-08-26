import s from './MyPosts.module.css'
import Post from './Post/Post'

const images = [
    { path: './img/avatars/avatar1.svg', text: 'Далеко-далеко, за словесными горами в стране гласных и согласных живут рыбные тексты. Всемогущая инициал даль великий свой однажды образ злых власти снова встретил залетают. Грамматики составитель, единственное вопрос несколько они текста его.'}
]
const MyPosts = () => {
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
                {images.map((img, index) => <Post key={index} path={`${img.path}`} text={img.text}/>)}
            </ul>
        </div>
    )
}

export default MyPosts