import {fetchInstance} from "./fetchInstance";
import {ResponseType} from "./api-dialogs";

const {base_Url,settings,getResponse} = fetchInstance()

export const profileApi = {
    getProfile(userId:number):Promise<ProfileType> {
        return getResponse(fetch(`${base_Url}/profile/${userId}`, settings))
    },
    getStatus(userId:number):Promise<string> {
        return getResponse(fetch(`${base_Url}/profile/status/${userId}`, settings))
    },
    setStatus(status:string):Promise<ResponseType> {
        return getResponse(fetch(`${base_Url}/profile/status`, {
                ...settings,
                method: "PUT",
                body: JSON.stringify({status})
            }
            ))
    }
}


export type ProfileType = {
    userId:number
    aboutMe:string | null
    lookingForAJob: boolean
    lookingForAJobDescription:string | null
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
export type PhotosType = {
    small:string | null
    large:string | null
}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook:string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube:string | null
    mainLink:string | null
}

