import { NavLink } from 'react-router-dom'

import socialSvg from './img/icons/social network_icon.svg'
import s from './Header.module.css'

const Header = ({isAuth, setLogout, currentUser, notAuthClassName}) => {
    return (
        <header className={isAuth ? s.header : `${s.header} ${notAuthClassName}`}>
            <div className={s.logo}>
                <NavLink to="/" className={s.logo__link}>
                    <img src={socialSvg} alt="Логотип сайта" />
                </NavLink>
            </div>

            {!isAuth 
            ? 
            <div className={s.header__btns}>
                <NavLink to='/login' className={s.login}>Авторизация</NavLink>
                <NavLink to='/registration' className={s.registration}>Регистрация</NavLink>
            </div>
            : 
                <div className={s.user__info}>
                    <div className={s.user__btn}>
                        <NavLink to='/login' onClick={() => {setLogout()}} className={s.close}>Выход</NavLink>
                    </div>

                    <div className={s.img__wrap}>
                        <NavLink to='/profile'>
                            <img src={currentUser.photoUrl} alt={`${currentUser.username} аватарка`} />
                        </NavLink>
                    </div>
                    
                    <div className={s.user__content}>
                        <p className={s.username}>{currentUser.username}</p>
                        <p>{currentUser.email}</p>
                    </div>
                </div>
                
            }
        </header>
    )
}

export default Header