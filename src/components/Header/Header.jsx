import { NavLink } from 'react-router-dom'

import socialSvg from './img/icons/social network_icon.svg'
import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.logo}>
                <NavLink to="/" className={s.logo__link}>
                    <img src={socialSvg} alt="Логотип сайта" />
                </NavLink>
            </div>
        </header>
    )
}

export default Header