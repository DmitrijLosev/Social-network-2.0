import {fetchInstance} from "./fetchInstance";
import { ResponseType} from "./api-dialogs";

const {base_Url,settings,getResponse} = fetchInstance()

export const authApi = {
    getAuth():Promise<ResponseType<AuthDataType>> {
        return getResponse(fetch(`${base_Url}/auth/me`, settings))
    }
}

export type AuthDataType = {
    id:number
    email: string
    login: string
}


