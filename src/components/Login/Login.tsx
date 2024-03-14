import { Field, reduxForm } from "redux-form";
import s from "./Login.module.css";
import formControlStyles from "../common/FormControls/FormControls.module.css";
import { useNavigate } from "react-router-dom";
import { maxLength, required } from "../../utils/validators";
import { Input } from "../common/FormControls/FormControls";
import { FC } from "react";


type LoginPropsType = {
    login: (login: string, password: string) => void
}
const Login: FC<LoginPropsType> = ({login}) => {
    const navigate = useNavigate();

    const onSubmit = (formData) => {
        login(formData.login, formData.password);
        navigate("/profile");
    };

    return (
        <div className={s.login}>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
}
export default Login

type LoginFormValuesType = {
    login: string,
    password: string
}
type LoginFormOwnPropsType = {}

const LoginForm = ({handleSubmit, error}) => {
    
    const maxLength320 = maxLength(320)
    const maxLength128 = maxLength(128)
    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <legend className={s.form__legend}>Авторизация</legend>

            {error && <p className={`${formControlStyles.formError}`}>{error}</p>}
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
            </div>

            <div className={s.form__btn}>
                <button type="submit">Авторизоваться</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);
