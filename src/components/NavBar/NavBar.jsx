import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css";
// import Friend from "./Friends/Friend/Friend";
// import StoreContext from "../../StoreContext";
import FriendsContainer from "./Friends/FriendsContainer";

const NavBar = (props) => {
    
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

            {/* Создать тег friends, в который поместить этот код, а friends уже должен принимать в себя через контейнерную компоненту в пропсах массив friends */}
            
            {props.isAuth && <FriendsContainer />}

            {/*Старый способ с friend вообще не правильный, нужно было создать контейнерную компоненту
             <StoreContext.Consumer>
                {(store) => {
                    return (
                        <div className={s.friends}>
                            <h3 className={s.friends__title}>Друзья</h3>
                            <div className={s.friends__items}>
                                {store.getState().navBarPage.friends.map(
                                    (friend, index) => (
                                        <Friend
                                            key={index}
                                            name={friend.name}
                                            path={friend.path}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    );
                }}
            </StoreContext.Consumer> */}
        </aside>
    );
};

export default NavBar;
