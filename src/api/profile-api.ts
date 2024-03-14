import { UserType } from "types/types";
import { ErrorResponseDataType, PutPostResponseDataType, ResultCodesEnum, instance } from "./api";


export const profileAPI = {
    setProfile(userId) {
        return instance
            .get<ProfileResponseDataType>("/" + userId)
            .then((resp) => resp.data);
    },
    updateStatus(status) {
        return instance
            .put<PutPostResponseDataType>(
                "/status",
                { status },
                { headers: { Authorization: localStorage.getItem("token") } }
            )
            .then((resp) => resp.data);
    },
};


type ProfileResponseDataType = {
    user: UserType;
    resultCode: ResultCodesEnum;
} & ErrorResponseDataType;