const Base_Url = "https://social-network.samuraijs.com/api/1.0" as const

const settings = {
    method: "GET",
    credentials: "include" as const,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "API-KEY": "99e456ee-d6c6-4a9b-9a62-843b8099abfe"
    }
}
const getResponse = async (response: Promise<Response>) => {
    let res = await response;
    return res.json()
}

export const usersApi = {
    getUsers(count:number,pageNumber:number):Promise<GetUsersResponseType> {
        return getResponse(fetch(`${Base_Url}/users?count=${count}&page=${pageNumber} `, settings))
    }
}
type GetUsersResponseType = {
    items:UserType[]
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

