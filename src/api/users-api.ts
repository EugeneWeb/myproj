import { ApiItemsType, ProfileType, UserType } from "types/types";
import { ErrorResponseDataType, PutPostResponseDataType, ResultCodesEnum, instance } from "./api";

export const usersAPI = {
    getUsers(perPage, currentPage) {
        return instance
            .get<ApiItemsType<UserType>>(
                `/all/?perPage=${perPage}&page=${currentPage}`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            .then((resp) => resp.data);
    },
    login(login, password) {
        return instance
            .post<LoginResponseDataType>("/login", { login, password })
            .then((resp) => resp.data);
    },
    registration(username, email, password) {
        return instance
            .post<PutPostResponseDataType>("/registration", {
                username,
                email,
                password,
            })
            .then((resp) => resp.data);
    },
    unfollow(userId) {
        return instance
            .delete<FollowResponseDataType>(`/unfollow/${userId}`, {
                headers: { Authorization: localStorage.getItem("token") },
            })
            .then((resp) => resp.data);
    },
    follow(userId) {
        return instance
            .post<FollowResponseDataType>(
                `/follow/${userId}`,
                {},
                { headers: { Authorization: localStorage.getItem("token") } }
            )
            .then((resp) => resp.data);
    },
};


type LoginResponseDataType = {
    token: string;
    user: ProfileType;
    resultCode: ResultCodesEnum;
} & ErrorResponseDataType;

type FollowResponseDataType = {
    resultCode: ResultCodesEnum;
};

