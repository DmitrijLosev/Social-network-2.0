import {fetchInstance} from "./fetchInstance";

const {base_Url,settings,getResponse} = fetchInstance()

export const profileApi = {
    getProfile(userId:number):Promise<ProfileType> {
        return getResponse(fetch(`${base_Url}/profile/${userId}`, settings))
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

