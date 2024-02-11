import {ActionsType, ThunkCommonType} from "./redux-store";
import {usersApi, UserType} from "../api/api-users";
import {commonActions} from "./app-reducer";

const FOLLOW_USER = "USERS/FOLLOW-USER" as const
const UNFOLLOW_USER = "USERS/UNFOLLOW-USER" as const
const SET_FOLLOW_FETCHING_ID = "USERS/SET-FOLLOW-FETCHING-ID" as const
const DELETE_FOLLOW_FETCHING_ID = "USERS/DELETE-FOLLOW-FETCHING-ID" as const
const SET_USERS = "USERS/SET-USERS" as const
const SET_TOTAL_USERS_COUNT = "USERS/SET-TOTAL-USERS-COUNT" as const
const SET_PAGE_SIZE = "USERS/SET-PAGE-SIZE" as const
const SET_CURRENT_PAGE = "USERS/SET-CURRENT-PAGE" as const


const initialState = {
    users: [] as UserType[],
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    idOfFollowingUsers: [] as number []
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
            return {...state, totalUsersCount: action.totalCount}
        case SET_PAGE_SIZE:
            return {...state, pageSize: action.pageSize}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case  SET_FOLLOW_FETCHING_ID:
            return {...state, idOfFollowingUsers: [...state.idOfFollowingUsers, action.userIdInFollowingProgress]}
        case  DELETE_FOLLOW_FETCHING_ID:
            return {...state, idOfFollowingUsers: state.idOfFollowingUsers.filter(u => u !== action.followedUserId)}
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
    setUserIdInFollowFetching: (userIdInFollowingProgress: number) => ({
        type: SET_FOLLOW_FETCHING_ID,
        userIdInFollowingProgress
    }) as const,
    deleteUserIdInFollowFetching: (followedUserId: number) => ({
        type: DELETE_FOLLOW_FETCHING_ID,
        followedUserId
    }) as const,
}

export const getUsers = (): ThunkCommonType => async (dispatch, getState) => {
    dispatch(commonActions.setIsFetching(true))
    let response = await usersApi.getUsers(getState().usersPage.pageSize, getState().usersPage.currentPage)
    dispatch(actions.setUsers(response.items))
    dispatch(actions.setTotalUsersCount(response.totalCount))
    dispatch(commonActions.setIsFetching(false))
}

export const follow = (userId:number): ThunkCommonType => async dispatch =>{
    dispatch(commonActions.setIsFetching(true))
    dispatch(actions.setUserIdInFollowFetching(userId))
    let res = await usersApi.followUser(userId)
    if (res.resultCode === 0) {
        dispatch(actions.follow(userId))
    }
    dispatch(actions.deleteUserIdInFollowFetching(userId))
    dispatch(commonActions.setIsFetching(false))
}


export const unfollow = (userId:number): ThunkCommonType => async dispatch => {
    dispatch(commonActions.setIsFetching(true))
    dispatch(actions.setUserIdInFollowFetching(userId))
    let res = await usersApi.unfollowUser(userId)
    if (res.resultCode === 0) {
        dispatch(actions.unfollow(userId))
    }
    dispatch(actions.deleteUserIdInFollowFetching(userId))
    dispatch(commonActions.setIsFetching(false))
}





export type UsersPageStateType = typeof initialState;
export type UsersActionsType =
    ReturnType<typeof actions.follow>
    | ReturnType<typeof actions.unfollow>
    | ReturnType<typeof actions.setUsers>
    | ReturnType<typeof actions.setTotalUsersCount>
    | ReturnType<typeof actions.setPageSize>
    | ReturnType<typeof actions.setCurrentPage>
    | ReturnType<typeof actions.setUserIdInFollowFetching>
    | ReturnType<typeof actions.deleteUserIdInFollowFetching>
