import {authApi, AuthDataType} from "../api/api-auth";
import {profileApi, ProfileType} from "../api/api-profile";
import {ThunkCommonType} from "./redux-store";
import {commonActions} from "./app-reducer";
import {setNewMessagesCountTC} from "./messages-reducer";


const SET_IS_AUTH = "APP/SET-IS-AUTH" as const
const SET_OWNER_PROFILE = "APP/SET-OWNER-PROFILE" as const

const initialState = {
    isAuth: false,
    ownerId: null as number | null,
    ownerEmail: null as string | null,
    ownerLogin: null as string | null,
    ownerProfile: null as ProfileType | null
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {

    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state, isAuth: action.isAuth,
                ownerId: action.ownerInfo?.id ? action.ownerInfo?.id : null,
                ownerEmail: action.ownerInfo?.email ? action.ownerInfo?.email : null,
                ownerLogin: action.ownerInfo?.login ? action.ownerInfo?.login : null
            }
        case SET_OWNER_PROFILE:
            return {...state, ownerProfile: action.profile}
        default:
            return state

    }
}
export const actions = {
    setIsAuth: (isAuth: boolean, ownerInfo?: AuthDataType) => ({type: SET_IS_AUTH, isAuth, ownerInfo}) as const,
    setOwnerProfile: (profile: ProfileType) => ({type: SET_OWNER_PROFILE, profile}) as const,
}

export const authMe = (): ThunkCommonType => async dispatch => {
    dispatch(commonActions.setIsFetching(true))
    let res = await authApi.getAuth()
    if (res.resultCode === 0) {
        dispatch(actions.setIsAuth(true, res.data))
        let res2 = await profileApi.getProfile(res.data.id)
        dispatch(actions.setOwnerProfile(res2))
        dispatch(setNewMessagesCountTC())
    } else {
        dispatch(actions.setIsAuth(false))
    }
    dispatch(commonActions.setIsFetching(false))
}


export type  AuthStateType = typeof initialState;
export type AuthActionsType = ReturnType<typeof actions.setIsAuth> | ReturnType<typeof actions.setOwnerProfile>


