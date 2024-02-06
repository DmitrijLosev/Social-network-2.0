import {ActionsType} from "./redux-store";
import {UserType} from "../api/api-users";

const FOLLOW_USER = "USERS/FOLLOW-USER" as const
const UNFOLLOW_USER = "USERS/UNFOLLOW-USER" as const
const SET_USERS = "USERS/SET-USERS" as const
const SET_TOTAL_USERS_COUNT = "USERS/SET-TOTAL-USERS-COUNT" as const
const SET_PAGE_SIZE = "USERS/SET-PAGE-SIZE" as const
const SET_CURRENT_PAGE = "USERS/SET-CURRENT-PAGE" as const

const initialState = {
    users: [] as UserType[],
    totalUsersCount: 0,
    pageSize: 10,
    currentPage:1
}

export const usersReducer = (state: UsersPageStateType = initialState, action: ActionsType): UsersPageStateType => {

    switch (action.type) {
        case FOLLOW_USER:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW_USER:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_TOTAL_USERS_COUNT:
            return {...state,totalUsersCount: action.totalCount}
        case SET_PAGE_SIZE:
            return {...state,pageSize: action.pageSize}
        case SET_CURRENT_PAGE:
            return {...state,currentPage: action.currentPage}
        default:
            return state

    }
}
export const actions = {
    follow: (userId: number) => ({type: FOLLOW_USER, userId}) as const,
    unfollow: (userId: number) => ({type: UNFOLLOW_USER, userId}) as const,
    setUsers: (users: UserType[]) => ({type: SET_USERS, users}) as const,
    setTotalUsersCount: (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalCount}) as const,
    setPageSize: (pageSize: number) => ({type: SET_PAGE_SIZE, pageSize}) as const,
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const,
}


export type UsersPageStateType = typeof initialState;
export type UsersActionsType =
    ReturnType<typeof actions.follow>
    | ReturnType<typeof actions.unfollow>
    | ReturnType<typeof actions.setUsers>
    | ReturnType<typeof actions.setTotalUsersCount>
    | ReturnType<typeof actions.setPageSize>
    | ReturnType<typeof actions.setCurrentPage>
