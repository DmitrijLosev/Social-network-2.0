import {AuthDataType} from "../api/api-auth";
import {ProfileType} from "../api/api-profile";


const SET_IS_AUTH = "APP/SET-IS-AUTH" as const
const SET_OWNER_PROFILE = "APP/SET-OWNER-PROFILE" as const

const initialState = {
    isAuth: false,
    ownerId:null as number | null,
    ownerEmail:null as string | null,
    ownerLogin:null as string | null,
    ownerProfile:null as ProfileType | null
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType):  AuthStateType => {

    switch (action.type) {
        case SET_IS_AUTH:
            return {...state, isAuth: action.isAuth,
                ownerId: action.ownerInfo?.id ? action.ownerInfo?.id : null,
                ownerEmail: action.ownerInfo?.email ? action.ownerInfo?.email : null,
                ownerLogin: action.ownerInfo?.login ? action.ownerInfo?.login : null}
        case SET_OWNER_PROFILE:
            return {...state, ownerProfile: action.profile}
        default:
            return state

    }
}
export const actions = {
    setIsAuth: (isAuth:boolean, ownerInfo?: AuthDataType) => ({type: SET_IS_AUTH, isAuth,ownerInfo}) as const,
    setOwnerProfile: (profile:ProfileType) => ({type: SET_OWNER_PROFILE,profile}) as const,
}


export type  AuthStateType = typeof initialState;
export type AuthActionsType = ReturnType<typeof actions.setIsAuth> | ReturnType<typeof actions. setOwnerProfile>


