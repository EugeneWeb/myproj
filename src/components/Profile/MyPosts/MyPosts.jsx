import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { maxLength } from "../../../utils/validators";
import { Textarea } from "../../common/FormControls/FormControls";

const MyPosts = (props) => {
    
    const onSubmit = (formData) => {
        props.addPost(formData.postText);
    }

    return (
        <div>
            <h2 className={s.title}>Посты пользователя</h2>

            <PostReduxForm onSubmit={onSubmit} />

            <ul className="posts">
                {props.posts.map((img, index) => (
                    <Post
                        key={index}
                        path={`${img.path}`}
                        text={img.text}
                        likesCount={img.likesCount}
                    />
                ))}
            </ul>
        </div>
    );
};

const PostForm = (props) => {
    // const newPostText = React.createRef();



    // const handleOnChange = (e) => {
    //     const postText = newPostText.current.value;
    //     props.updateNewPostText(postText);
    // };
    const maxLength200 = maxLength(200)
    return (
        <form id={s.addNews} onSubmit={props.handleSubmit}>
            <Field id={s.postText} name="postText" component={Textarea} elementtype="textarea" placeholder="Ваша новость..." validate={[maxLength200]} />

            {/* <textarea
                ref={newPostText}
                placeholder="Ваша новость..."
                onChange={handleOnChange}
                value={props.newPostText}
            ></textarea> */}
            <div className={s.addNews__btn}>
                <button type="submit">Отправить</button>
            </div>
        </form>
    );
};

const PostReduxForm = reduxForm({form: 'post'})(PostForm)

export default MyPosts;
