import { FriendType } from "types/types";
import Friend from "./Friend/Friend";
import s from "./Friends.module.css";
import { FC } from "react";

type PropsType = {
    friends: FriendType[]
}
const Friends: FC<PropsType> = ({friends}) => {
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
