import {ActionsType} from "./redux-store";


const CHANGE_DIALOG_MESSAGE = "CHANGE-DIALOG-MESSAGE" as const
const ADD_DIALOG_MESSAGE = "ADD-DIALOG-MESSAGE" as const

const initialState = {
    dialogUsers: [
        {id: 1, name: "Dima"},
        {id: 2, name: "Tanya"},
        {id: 3, name: "Misha"},
        {id: 4, name: "Igor"},
    ] as DialogUserType[],
    messages: [
        {id: 1, message: "Hello!"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "How's your business?"},
        {id: 4, message: "What are news?"}
    ] as MessageType[],
    typingDialogMessage: ""
}


export const dialogReducer = (state: DialogsPageStateType = initialState, action: ActionsType):DialogsPageStateType => {

    switch (action.type) {
        case ADD_DIALOG_MESSAGE :
            state.messages.push({
                id: state.messages.length + 1,
                message: state.typingDialogMessage,
            })
            state.typingDialogMessage = "";
            return state
        case CHANGE_DIALOG_MESSAGE:
            state.typingDialogMessage = action.typingDialogMessage
            return state
        default:
            return state
    }
}


export const addDialogMessageAC = () => ({type: ADD_DIALOG_MESSAGE}) as const
export const changeDialogMessageAC = (typingDialogMessage: string) =>
    ({type: CHANGE_DIALOG_MESSAGE, typingDialogMessage}) as const


export type DialogUserType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type DialogsPageStateType =typeof initialState
export type DialogActionsType = ReturnType<typeof addDialogMessageAC> | ReturnType<typeof changeDialogMessageAC>