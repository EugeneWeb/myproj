import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { maxLength } from "../../../utils/validators";
import { Textarea } from "../../common/FormControls/FormControls";

const MyPosts = ({addPost, posts, }) => {
    
    const onSubmit = (formData) => {
        addPost(formData.postText);
    }

    return (
        <div>
            <h2 className={s.title}>Посты пользователя</h2>

            <PostReduxForm onSubmit={onSubmit} />

            <ul className="posts">
                {posts.map((img, index) => (
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

const PostForm = ({handleSubmit}) => {

    const maxLength200 = maxLength(200)
    return (
        <form id={s.addNews} onSubmit={handleSubmit}>
            <Field id={s.postText} name="postText" component={Textarea} elementtype="textarea" placeholder="Ваша новость..." validate={[maxLength200]} />

            <div className={s.addNews__btn}>
                <button type="submit">Отправить</button>
            </div>
        </form>
    );
};

const PostReduxForm = reduxForm({form: 'post'})(PostForm)

export default MyPosts;
