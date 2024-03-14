import { ProfileType } from "types/types";
import { ErrorResponseDataType, ResultCodesEnum, instance } from "./api";


export const authAPI = {
    me() {
        return instance
            .post<AuthResponseDataType>("/auth", {})
            .then((resp) => resp.data);
    },
};


export type AuthResponseDataType = {
    user: ProfileType;
    resultCode: ResultCodesEnum;
} & ErrorResponseDataType;