import s from "./Registration.module.css";
import { Field, reduxForm } from "redux-form";
import { maxLength, required } from "../../utils/validators";
import { Input } from "../common/FormControls/FormControls";
import formControlStyles from "../common/FormControls/FormControls.module.css";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
    // const handleSubmit = (e) => {
    //     const elements = e.target.elements;
    //     props.registration(
    //         elements.username.value,
    //         elements.email.value,
    //         elements.password.value
    //     );
    //     e.preventDefault();
    //     navigate("/login");
    // };

    const navigate = useNavigate();
    if (props.isRegistered) {
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    }

    const onSubmit = (formData) => {
        props.registration(
            formData.username,
            formData.email,
            formData.password
        );
    };

    return (
        <div className={s.registration}>
            {props.isRegistered && (
                <h1>Пользователь был успешно зарегистрирован</h1>
            )}
            {!props.isRegistered && (
                <RegistrationReduxForm onSubmit={onSubmit} />
            )}

            {/* <form onSubmit={handleSubmit} className={s.form}>
                <legend className={s.form__legend}>Регистрация</legend>
                <div className={s.form__field}>
                    <input
                        id={s.username}
                        type="text"
                        name="username"
                        placeholder="Имя пользователя"
                    />
                </div>
                <div className={s.form__field}>
                    <input
                        id={s.email}
                        type="email"
                        name="email"
                        placeholder="E-mail"
                    />
                </div>
                <div className={s.form__field}>
                    <input
                        id={s.password}
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        autoComplete="on"
                    />
                </div>

                <div className={s.form__btn}>
                    <button type="submit">Зарегистрироваться</button>
                </div>
            </form> */}
        </div>
    );
};

const RegistrationForm = (props) => {
    const maxLength320 = maxLength(320);
    const maxLength128 = maxLength(128);
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <legend className={s.form__legend}>Регистрация</legend>

            {props.error && (
                <p className={`${formControlStyles.formError}`}>
                    {props.error}
                </p>
            )}
            <div className={s.form__field}>
                <Field
                    id={s.username}
                    type="text"
                    name="username"
                    placeholder="Имя пользователя"
                    component={Input}
                    elementtype="input"
                    validate={[required, maxLength128]}
                />
                {/* <input
                        id={s.username}
                        type="text"
                        name="username"
                        placeholder="Имя пользователя"
                    /> */}
            </div>
            <div className={s.form__field}>
                <Field
                    id={s.email}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    component={Input}
                    elementtype="input"
                    validate={[required, maxLength320]}
                />
                {/* <input
                        id={s.email}
                        type="email"
                        name="email"
                        placeholder="E-mail"
                    /> */}
            </div>
            <div className={s.form__field}>
                <Field
                    component={Input}
                    elementtype="input"
                    id={s.password}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    autoComplete="on"
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
                <button type="submit">Зарегистрироваться</button>
            </div>
        </form>
    );
};

const RegistrationReduxForm = reduxForm({ form: "registration" })(
    RegistrationForm
);

export default Registration;
