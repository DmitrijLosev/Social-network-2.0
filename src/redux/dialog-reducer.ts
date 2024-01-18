import {ActionsType} from "./redux-store";


const CHANGE_DIALOG_MESSAGE = "DIALOGS/CHANGE-DIALOG-MESSAGE" as const
const ADD_DIALOG_MESSAGE = "DIALOGS/ADD-DIALOG-MESSAGE" as const

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
            return {
                ...state,
            messages: [...state.messages, {id:state.messages.length + 1, message:state.typingDialogMessage}],
            typingDialogMessage: ""
            }
        case CHANGE_DIALOG_MESSAGE:
            return {...state,typingDialogMessage:action.typingDialogMessage}
        default:
            return state
    }
}

export const actions={
    addDialogMessage:{type: ADD_DIALOG_MESSAGE} as const,
    changeDialogMessage:(typingDialogMessage: string) =>
        ({type: CHANGE_DIALOG_MESSAGE, typingDialogMessage}) as const}



export type DialogUserType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type DialogsPageStateType =typeof initialState
export type DialogActionsType = typeof actions.addDialogMessage | ReturnType<typeof actions.changeDialogMessage>