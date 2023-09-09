import s from './Login.module.css'
import {useNavigate} from 'react-router-dom'

export default function Login(props) {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const elements = e.target.elements

        const login = elements.login.value
        const password = elements.password.value
        props.login(login, password)
        navigate('/profile')
    }

  return (
    <div className={s.login}>
        {!props.isAuth && <form onSubmit={handleSubmit} className={s.form}>
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
            </form>}
    </div>
  )
}
