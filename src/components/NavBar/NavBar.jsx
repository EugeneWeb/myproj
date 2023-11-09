import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css";
import FriendsContainer from "./Friends/FriendsContainer";

const NavBar = ({isAuth}) => {
    
    return (
        <aside className={s.navbar}>
            <nav className={s.navigation}>
                <ul>
                    <li className={s.navigation__item}>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive
                                    ? `${s.active} ${s.navigation__link}`
                                    : s.navigation__link
                            }
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li className={s.navigation__item}>
                        <NavLink
                            to="/messages"
                            className={({ isActive }) =>
                                isActive
                                    ? `${s.active} ${s.navigation__link}`
                                    : s.navigation__link
                            }
                        >
                            Сообщения
                        </NavLink>
                    </li>
                    <li className={s.navigation__item}>
                        <NavLink
                            to="/news"
                            className={({ isActive }) =>
                                isActive
                                    ? `${s.active} ${s.navigation__link}`
                                    : s.navigation__link
                            }
                        >
                            Новости
                        </NavLink>
                    </li>
                    <li className={s.navigation__item}>
                        <NavLink
                            to="/music"
                            className={({ isActive }) =>
                                isActive
                                    ? `${s.active} ${s.navigation__link}`
                                    : s.navigation__link
                            }
                        >
                            Музыка
                        </NavLink>
                    </li>
                    <li className={s.navigation__item}>
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                isActive
                                    ? `${s.active} ${s.navigation__link}`
                                    : s.navigation__link
                            }
                        >
                            Поиск
                        </NavLink>
                    </li>
                    <li className={s.navigation__item}>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                isActive
                                    ? `${s.active} ${s.navigation__link}`
                                    : s.navigation__link
                            }
                        >
                            Настройки
                        </NavLink>
                    </li>
                </ul>
            </nav>
            
            {isAuth && <FriendsContainer />}

        </aside>
    );
};

export default NavBar;
