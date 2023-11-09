import s from "./Registration.module.css";
import { Field, reduxForm } from "redux-form";
import { maxLength, required } from "../../utils/validators";
import { Input } from "../common/FormControls/FormControls";
import formControlStyles from "../common/FormControls/FormControls.module.css";
import { useNavigate } from "react-router-dom";

const Registration = ({isRegistered, registration}) => {

    const navigate = useNavigate();
    if (isRegistered) {
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    }

    const onSubmit = (formData) => {
        registration(
            formData.username,
            formData.email,
            formData.password
        );
    };

    return (
        <div className={s.registration}>
            {isRegistered && (
                <h1>Пользователь был успешно зарегистрирован</h1>
            )}
            {!isRegistered && (
                <RegistrationReduxForm onSubmit={onSubmit} />
            )}

        </div>
    );
};

const RegistrationForm = ({handleSubmit, error}) => {
    const maxLength320 = maxLength(320);
    const maxLength128 = maxLength(128);
    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <legend className={s.form__legend}>Регистрация</legend>

            {error && (
                <p className={`${formControlStyles.formError}`}>
                    {error}
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
