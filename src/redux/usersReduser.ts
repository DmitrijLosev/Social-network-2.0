import {ActionsType} from "./redux-store";
import smallUnknownPhoto from "./../assets/images/UnknowIcon.svg"

const FOLLOW_USER = "USERS/FOLLOW-USER" as const
const UNFOLLOW_USER = "USERS/UNFOLLOW-USER" as const
const SET_USERS = "USERS/SET-USERS" as const


const initialState = {users:[] as UserType[]}

export const usersReducer = (state: UsersPageStateType = initialState, action: ActionsType): UsersPageStateType => {

    switch (action.type) {
        case FOLLOW_USER:
            return {...state,users:state.users.map(u=>u.id===action.userId ? {...u,follow: true} : u)}
        case UNFOLLOW_USER:
            return {...state,users:state.users.map(u=>u.id===action.userId ? {...u,follow: false} : u)}
        case SET_USERS:
            return  {...state,users:[...state.users,...action.users]}
        default:
            return state

    }
}
export const actions = {
    follow:(userId:number)=>({type:FOLLOW_USER, userId}) as const,
    unfollow:(userId:number)=>({type:UNFOLLOW_USER, userId}) as const,
    setUsers:(users:UserType[])=>({type:SET_USERS, users})
}


export type UserType = {
    id: number,
    name:string,
    status: string,
    photos: {
        small: string,
        large: string
    },
    follow: boolean
}
export type UsersPageStateType = typeof initialState;
export type UsersActionsType= ReturnType<typeof actions.follow> | ReturnType<typeof actions.unfollow> | ReturnType<typeof actions.setUsers>
