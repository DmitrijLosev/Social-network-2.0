import {ActionsType, DialogsPageStateType} from "./state";

export type DialogActionsType=ReturnType<typeof addDialogMessageAC> | ReturnType<typeof changeDialogMessageAC>

const CHANGE_DIALOG_MESSAGE = "CHANGE-DIALOG-MESSAGE" as const
const ADD_DIALOG_MESSAGE = "ADD-DIALOG-MESSAGE" as const


export const dialogReducer = (state: DialogsPageStateType, action:ActionsType) => {

    switch (action.type) {
        case ADD_DIALOG_MESSAGE :
             state.messages.push({
                id: state.messages.length + 1,
                message: state.typingDialogMessage,
            })
            state.typingDialogMessage="";
            return state
        case CHANGE_DIALOG_MESSAGE:
            state.typingDialogMessage = action.typingDialogMessage
            return state
        default:
            return state

    }
}


export const addDialogMessageAC=()=>({type:ADD_DIALOG_MESSAGE}) as const
export const changeDialogMessageAC=(typingDialogMessage:string)=>({type:CHANGE_DIALOG_MESSAGE, typingDialogMessage}) as const