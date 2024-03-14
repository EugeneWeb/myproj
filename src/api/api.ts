import axios from "axios";

export const instance = axios.create({
    baseURL: "http://127.0.0.1:5000/api/user",
    headers: { Authorization: localStorage.getItem("token") },
});

export const enum ResultCodesEnum {
    Success,
    Error
}
export type ErrorResponseDataType = {
    message?: string;
    info?: { [propName: string]: any };
};
export type PutPostResponseDataType = {
    message: string;
    resultCode: ResultCodesEnum;
} & ErrorResponseDataType;




