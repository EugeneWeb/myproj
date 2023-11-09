import Friend from "./Friend/Friend";
import s from "./Friends.module.css";

const Friends = ({friends}) => {
    return (
        <div className={s.friends}>
            <h3 className={s.friends__title}>Друзья</h3>
            <div className={s.friends__items}>
                {friends.map((friend, index) => (
                    <Friend key={index} name={friend.name} path={friend.path} />
                ))}
            </div>
        </div>
    );
};

export default Friends;
