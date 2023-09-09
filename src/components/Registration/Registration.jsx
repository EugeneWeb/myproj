import s from "./Registration.module.css";

export default function Registration(props) {
    const handleSubmit = (e) => {
        const elements = e.target.elements;
        props.registration(
            elements.username.value,
            elements.email.value,
            elements.password.value
        );
        e.preventDefault();
    };
    return (
         <div className={s.registration}>
            {!props.isRegistered ? <form onSubmit={handleSubmit} className={s.form}>
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
            </form> : <h1>Пользователь был успешно зарегистрирован</h1>}
        </div>
    );
}
