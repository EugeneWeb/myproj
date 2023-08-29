import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'


const MyPosts = (props) => {
    const newPostText = React.createRef()

    const handleOnClick = () => {
        props.addPost()
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
    }

    const handleOnChange = (e) => {
        const postText = newPostText.current.value
        props.updateNewPostText(postText)
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