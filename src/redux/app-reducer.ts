import {ActionsType} from "./redux-store";


const SET_IS_FETCHING = "APP/SET-IS-FETCHING" as const


const initialState = {
    isFetching: false
}

export const appReducer = (state: AppCommonStateType = initialState, action:AppActionsType): AppCommonStateType => {

    switch (action.type) {
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state

    }
}
export const commonActions = {
    setIsFetching: (isFetching: boolean) => ({type: SET_IS_FETCHING, isFetching}) as const,
}


export type AppCommonStateType = typeof initialState;
export type AppActionsType = SetIsFetchingActionType

export type SetIsFetchingActionType = ReturnType<typeof commonActions.setIsFetching>

