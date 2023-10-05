import { Field, reduxForm } from "redux-form";
import s from "./Login.module.css";
import formControlStyles from "../common/FormControls/FormControls.module.css";
import { useNavigate } from "react-router-dom";
import { maxLength, required } from "../../utils/validators";
import { Input } from "../common/FormControls/FormControls";

export default function Login(props) {
    const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const elements = e.target.elements;

    //     const login = elements.login.value;
    //     const password = elements.password.value;
    //     props.login(login, password);
    //     navigate("/profile");
    // };

    const onSubmit = (formData) => {
        props.login(formData.login, formData.password);
        navigate("/profile");
    };

    return (
        <div className={s.login}>
            <LoginReduxForm onSubmit={onSubmit} />
            {/* <form onSubmit={handleSubmit} className={s.form}>
                <legend className={s.form__legend}>Авторизация</legend>
                <div className={s.form__field}>
                    <input
                        id={s.username}
                        type="text"
                        name="login"
                        placeholder="Имя пользователя или E-mail"
                    />
                </div>
                <div className={s.form__field}>
                    <input
                        id={s.password}
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        autoComplete='on'
                    />
                </div>

                <div className={s.form__btn}>
                    <button type="submit">Авторизоваться</button>
                </div>
            </form> */}
        </div>
    );
}

const LoginForm = (props) => {
    
    const maxLength320 = maxLength(320)
    const maxLength128 = maxLength(128)
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <legend className={s.form__legend}>Авторизация</legend>

            {props.error && <p className={`${formControlStyles.formError}`}>{props.error}</p>}
            <div className={s.form__field}>
                <Field
                    name="login"
                    type="text"
                    elementtype="input"
                    component={Input}
                    placeholder="Имя пользователя или E-mail"
                    id={s.username}
                    validate={[required, maxLength320]}
                />
                {/* <input
                    id={s.username}
                    type="text"
                    name="login"
                    placeholder="Имя пользователя или E-mail"
                /> */}
            </div>
            <div className={s.form__field}>
                <Field
                    type="password"
                    name="password"
                    elementtype="input"
                    component={Input}
                    placeholder="Пароль"
                    autoComplete="on"
                    id={s.password}
                    validate={[required, maxLength128]}
                />
                {/* <input
                    id={s.password}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    autoComplete="on"
                /> */}
            </div>

            <div className={s.form__btn}>
                <button type="submit">Авторизоваться</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);
