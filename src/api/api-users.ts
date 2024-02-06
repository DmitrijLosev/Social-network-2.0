import {fetchInstance} from "./fetchInstance";
import {ResponseType} from "./api-dialogs";

const {base_Url,settings,getResponse} = fetchInstance()

export const usersApi = {
    getUsers(count:number,pageNumber:number):Promise< GetItemsResponseType<UserType[]>> {
        return getResponse(fetch(`${base_Url}/users?count=${count}&page=${pageNumber}`, settings))
    },
    followUser(userId:number):Promise<ResponseType> {
        return getResponse(fetch(`${base_Url}/follow/${userId}`,{
            ...settings,
            method: "POST"
        }))
    },
    unfollowUser(userId:number):Promise<ResponseType> {
        return getResponse(fetch(`${base_Url}/follow/${userId}`,{
            ...settings,
            method: "DELETE"
        }))
    }
}
export type GetItemsResponseType<I={}> = {
    items:I
    totalCount:number
    error:string | null
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

