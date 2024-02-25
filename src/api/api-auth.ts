import {fetchInstance} from "./fetchInstance";
import { ResponseType} from "./api-dialogs";
import {LoginFormType} from "../components/Login/Login";

const {base_Url,settings,getResponse} = fetchInstance()

export const authApi = {
    getAuth():Promise<ResponseType<AuthDataType>> {
        return getResponse(fetch(`${base_Url}/auth/me`, settings))
    },
    login(data:LoginFormType):Promise<ResponseType<{userId:number}>> {
        return getResponse(fetch(`${base_Url}/auth/login`, {
            ...settings,
            method: "POST",
            body: JSON.stringify(data)
        } ))
    },
    logout():Promise<ResponseType> {
        return getResponse(fetch(`${base_Url}/auth/login`, {
            ...settings,
            method: "DELETE",
        } ))
    },

}

export type AuthDataType = {
    id:number
    email: string
    login: string
}


