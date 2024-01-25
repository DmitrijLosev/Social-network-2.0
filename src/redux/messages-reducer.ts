import {dialogsApi, DialogsType, MessageType} from "../api/api-dialogs";
import {ThunkDispatch} from "redux-thunk";
import {ActionsType, RootStateType} from "./redux-store";

const SET_DIALOGS = "MESSAGES/SET-DIALOGS" as const
const SET_NEW_MESSAGES_COUNT = "MESSAGES/SET-NEW-MESSAGES-COUNT" as const
const SET_USER_ID_FOR_MESSAGING = "MESSAGES/SET-USER-ID-FOR-MESSAGING" as const
const SET_MESSAGES_WITH_USER = "SET-MESSAGES-WITH-USER" as const
const SET_NEW_MESSAGE_TEXT = "SET-NEW-MESSAGE-TEXT" as const
const ADD_NEW_MESSAGE = "ADD-NEW-MESSAGE" as const


const initialState = {
    dialogs:[] as DialogsType[],
    newMessagesCount:0,
    userIdForMessaging:null as number | null,
    messagesWithUser:[] as MessageType[],
    newMessageText:""
}


export const messagesReducer = (state: MessagesPageStateType = initialState, action: MessagesActionType):MessagesPageStateType => {

    switch (action.type) {
        case SET_DIALOGS :
            return {...state,dialogs:action.dialogs}
        case SET_NEW_MESSAGES_COUNT :
            return {...state,newMessagesCount:action.count}
        case SET_USER_ID_FOR_MESSAGING :
            return {...state,userIdForMessaging:action.id}
        case SET_MESSAGES_WITH_USER :
            return {...state,messagesWithUser:action.messages}
        case SET_NEW_MESSAGE_TEXT :
            return {...state,newMessageText:action.message}
        case ADD_NEW_MESSAGE :
            return {...state,messagesWithUser:[...state.messagesWithUser,action.newMessage]}
        default:
            return state
    }
}

export const actions={
    setDialogs:(dialogs: DialogsType[]) =>
        ({type: SET_DIALOGS, dialogs}) as const,
    setNewMessagesCont:(count: number) =>
        ({type: SET_NEW_MESSAGES_COUNT, count}) as const,
    setUserIdForMessaging:(id: number) =>
        ({type: SET_USER_ID_FOR_MESSAGING, id}) as const,
    setMessagesWithUser:(messages:MessageType[]) =>
        ({type: SET_MESSAGES_WITH_USER, messages}) as const,
    setNewMessageText:(message:string) =>
        ({type: SET_NEW_MESSAGE_TEXT, message}) as const,
    addNewMessage:(newMessage:MessageType) =>
        ({type: ADD_NEW_MESSAGE, newMessage}) as const
}

export const sendMessageTC = () => async(dispatch:ThunkDispatch<RootStateType, unknown, ActionsType>,getState:()=>RootStateType)=>{
    const userId=getState().messagesPage.userIdForMessaging;
    const messageText =  getState().messagesPage.newMessageText
    if (userId) {
        let response = await dialogsApi.sentMessageToUser(userId, messageText)
        if (response.resultCode === 0) {
            let { deletedBySender, deletedByRecipient, isSpam, distributionId, ...newMessage}=response.data.message
            dispatch(actions.addNewMessage(newMessage))
            dispatch(actions.setNewMessageText(""))
        }
    }
}




export type MessagesPageStateType =typeof initialState
export type MessagesActionType = ReturnType<typeof actions.setDialogs> | ReturnType<typeof actions. setNewMessagesCont> | ReturnType<typeof actions. setUserIdForMessaging>| ReturnType<typeof actions. setMessagesWithUser>| ReturnType<typeof actions.  setNewMessageText>| ReturnType<typeof actions.addNewMessage>