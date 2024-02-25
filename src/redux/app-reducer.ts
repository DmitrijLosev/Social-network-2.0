


const SET_IS_FETCHING = "APP/SET-IS-FETCHING" as const
const SET_IS_INITIALIZE = "APP/SET-IS-INITIALIZE" as const

const initialState = {
    isFetching: false,
    isInitialize:false
}

export const appReducer = (state: AppCommonStateType = initialState, action:AppActionsType): AppCommonStateType => {

    switch (action.type) {
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_IS_INITIALIZE:
            return {...state, isInitialize: action.isInitialize}
        default:
            return state

    }
}
export const commonActions = {
    setIsFetching: (isFetching: boolean) => ({type: SET_IS_FETCHING, isFetching}) as const,
    setIsInitialize: (isInitialize: boolean) => ({type: SET_IS_INITIALIZE, isInitialize}) as const,
}


export type AppCommonStateType = typeof initialState;
export type AppActionsType = SetIsFetchingActionType

export type SetIsFetchingActionType = ReturnType<typeof commonActions.setIsFetching> | ReturnType<typeof commonActions.setIsInitialize>

