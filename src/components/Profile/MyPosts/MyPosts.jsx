import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'


// Не забываем убрать стандартное поведение формы, в данном случае нам не нужна перезагрузка страницы
// Добавляем value, чтобы запретить вводить в textarea и обрабатываем каждый добавленный символ(чтобы он сначала по FLUX архитектуре добавлялся в state, а потом возвращался в UI)
const MyPosts = (props) => {
    const newPostText = React.createRef()

    // Так как мы итак имеем данные из textarea в state.js, то просто при вызове addPost берём уже переданные данные из state
    // Также в addPost делаем очистку input после добавления поста
    const handleOnClick = () => {
        // const postText = newPostText.current.value
        // props.addPost(postText)
        props.addPost()
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
    }

    const handleOnChange = (e) => {
        const postText = newPostText.current.value
        props.setNewPostText(postText)
    }


    return (
        <div>
            <h2 className={s.title}>Мои посты</h2>

            <form id={s.addNews} onSubmit={handleOnSubmit}>
                <textarea ref={newPostText} placeholder='Ваша новость...' onChange={handleOnChange} value={props.newPostText}></textarea>
                <div className={s.addNews__btn}>
                    <button onClick={handleOnClick}>Отправить</button>
                </div> 
            </form>

            <ul className="posts">
                {props.posts.map((img, index) => <Post key={index} path={`${img.path}`} text={img.text} likesCount={img.likesCount}/>)}
            </ul>
        </div>
    )
}

export default MyPosts