import {authApi, AuthDataType} from "../api/api-auth";
import {profileApi, ProfileType} from "../api/api-profile";
import {ThunkCommonType} from "./redux-store";
import {commonActions} from "./app-reducer";
import {setNewMessagesCountTC} from "./messages-reducer";
import {LoginFormType} from "../components/Login/Login";


const SET_IS_AUTH = "AUTH/SET-IS-AUTH" as const
const SET_OWNER_PROFILE = "AUTH/SET-OWNER-PROFILE" as const
const SET_LOGIN_FORM_ERROR = "AUTH/SET-LOGIN-FORM-ERROR" as const


const initialState = {
    isAuth: false,
    ownerId: null as number | null,
    ownerEmail: null as string | null,
    ownerLogin: null as string | null,
    ownerProfile: null as ProfileType | null,
    loginFormError: null as string | null
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
        case SET_LOGIN_FORM_ERROR:
            return {...state, loginFormError: action.error}
        default:
            return state

    }
}
export const actions = {
    setIsAuth: (isAuth: boolean, ownerInfo?: AuthDataType) => ({type: SET_IS_AUTH, isAuth, ownerInfo}) as const,
    setOwnerProfile: (profile: ProfileType) => ({type: SET_OWNER_PROFILE, profile}) as const,
    setLoginFormError: (error: string | null) => ({type: SET_LOGIN_FORM_ERROR, error}) as const,
}

export const authMe = (): ThunkCommonType => async dispatch => {
    dispatch(commonActions.setIsInitialize(true))

    let res = await authApi.getAuth()
    if (res.resultCode === 0) {
        dispatch(actions.setIsAuth(true, res.data))
        let res2 = await profileApi.getProfile(res.data.id)
        dispatch(actions.setOwnerProfile(res2))
        dispatch(setNewMessagesCountTC())
    } else {
        dispatch(actions.setIsAuth(false))
    }

    dispatch(commonActions.setIsInitialize(false))
}
export const login = (data:LoginFormType): ThunkCommonType => async dispatch => {
    dispatch(commonActions.setIsFetching(true))
    dispatch(actions.setLoginFormError(null))
    let res = await authApi.login(data)
    if (res.resultCode === 0) {
        dispatch(authMe())
    }
    if(res.resultCode === 1){
        dispatch(actions.setLoginFormError(res.messages[0]))
    }
    dispatch(commonActions.setIsFetching(false))
}
export const logout = (): ThunkCommonType => async dispatch => {
    dispatch(commonActions.setIsFetching(true))
    let res = await authApi.logout()
    if (res.resultCode === 0) {
        dispatch(actions.setIsAuth(false))
    }
    dispatch(commonActions.setIsFetching(false))
}


export type  AuthStateType = typeof initialState;
export type AuthActionsType = ReturnType<typeof actions.setIsAuth> | ReturnType<typeof actions.setOwnerProfile>
    | ReturnType<typeof actions.setLoginFormError>



