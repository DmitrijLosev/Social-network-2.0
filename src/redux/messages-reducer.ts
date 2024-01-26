import {dialogsApi, DialogsType, MessageType} from "../api/api-dialogs";
import {ThunkDispatch} from "redux-thunk";
import {ActionsType, RootStateType} from "./redux-store";

const SET_DIALOGS = "MESSAGES/SET-DIALOGS" as const
const SET_NEW_MESSAGES_COUNT = "MESSAGES/SET-NEW-MESSAGES-COUNT" as const
const SET_USER_ID_FOR_MESSAGING = "MESSAGES/SET-USER-ID-FOR-MESSAGING" as const
const SET_MESSAGES_WITH_USER = "MESSAGES/SET-MESSAGES-WITH-USER" as const
const SET_NEW_MESSAGE_TEXT = "MESSAGES/SET-NEW-MESSAGE-TEXT" as const
const ADD_NEW_MESSAGE = "MESSAGES/ADD-NEW-MESSAGE" as const
const DELETE_MESSAGE = "MESSAGES/DELETE-MESSAGE" as const
const IS_MESSAGE_VIEWED = "MESSAGES/IS-MESSAGE-VIEWED" as const


const initialState = {
    dialogs: [] as DialogsType[],
    newMessagesCount: 0,
    userIdForMessaging: null as number | null,
    messagesWithUser: [] as MessageType[],
    newMessageText: ""
}


export const messagesReducer = (state: MessagesPageStateType = initialState, action: MessagesActionType): MessagesPageStateType => {

    switch (action.type) {
        case SET_DIALOGS :
            return {...state, dialogs: action.dialogs}
        case SET_NEW_MESSAGES_COUNT :
            return {...state, newMessagesCount: action.count}
        case SET_USER_ID_FOR_MESSAGING :
            return {...state, userIdForMessaging: action.id}
        case SET_MESSAGES_WITH_USER :
            return {...state, messagesWithUser: action.messages}
        case SET_NEW_MESSAGE_TEXT :
            return {...state, newMessageText: action.message}
        case ADD_NEW_MESSAGE :
            return {...state, messagesWithUser: [...state.messagesWithUser, action.newMessage], newMessageText: ""}
        case DELETE_MESSAGE :
            return {
                ...state, messagesWithUser: state.messagesWithUser
                    .filter(m => m.id !== action.messageId)
            }
        case IS_MESSAGE_VIEWED:
            return {
                ...state, messagesWithUser: state.messagesWithUser
                    .map(m => m.id === action.messageId ? {...m,viewed:action.isViewed} : m)}
        default:
            return state
    }
}

export const actions = {
    setDialogs: (dialogs: DialogsType[]) =>
        ({type: SET_DIALOGS, dialogs}) as const,
    setNewMessagesCont: (count: number) =>
        ({type: SET_NEW_MESSAGES_COUNT, count}) as const,
    setUserIdForMessaging: (id: number) =>
        ({type: SET_USER_ID_FOR_MESSAGING, id}) as const,
    setMessagesWithUser: (messages: MessageType[]) =>
        ({type: SET_MESSAGES_WITH_USER, messages}) as const,
    setNewMessageText: (message: string) =>
        ({type: SET_NEW_MESSAGE_TEXT, message}) as const,
    addNewMessage: (newMessage: MessageType) =>
        ({type: ADD_NEW_MESSAGE, newMessage}) as const,
    deleteMessage: (messageId: string) =>
        ({type: DELETE_MESSAGE, messageId}) as const,
    setIsMessageViewed: (isViewed: boolean,messageId:string) =>
        ({type: IS_MESSAGE_VIEWED, isViewed, messageId}) as const,
}

export const sendMessageTC = () => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {
    const userId = getState().messagesPage.userIdForMessaging;
    const messageText = getState().messagesPage.newMessageText
    if (userId) {
        let response = await dialogsApi.sentMessageToUser(userId, messageText)
        if (response.resultCode === 0) {
            await dispatch(setDialogsTC());
            let {deletedBySender, deletedByRecipient, isSpam, distributionId, ...newMessage} = response.data.message;
            dispatch(actions.addNewMessage(newMessage));
        }
    }
}

export const setMessagesWithUserTC = (userId: number) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {
    dispatch(actions.setUserIdForMessaging(userId))
    if (getState().messagesPage.dialogs.length === 0) {//after getting profile need to fix that
        let response = await dialogsApi.getDialogs()
        dispatch(actions.setDialogs(response))
    }
    let response = await dialogsApi.getDialogWithUser(userId, 1, 10)
    dispatch(actions.setMessagesWithUser(response.items))
}

export const setDialogsTC = () => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    let response = await dialogsApi.getDialogs()
    dispatch(actions.setDialogs(response))
}

export const setNewMessagesCountTC = () => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {
    let response = await dialogsApi.getNewMessagesCount()
    if (response !== getState().messagesPage.newMessagesCount) {
        dispatch(actions.setNewMessagesCont(response))
    }
}
export const upInDialogListTC = (userId: number) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    let response = await dialogsApi.putDialogWithUserInTopOfList(userId);
    if (response.resultCode === 0) {
        let response = await dialogsApi.getDialogs()
        dispatch(actions.setDialogs(response))
    }
}

export const deleteMessageTC = (messageId: string) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    let response = await dialogsApi.deleteMessage(messageId);
    if (response.resultCode === 0) {
        dispatch(actions.deleteMessage(messageId))
    }
}
export const isMessageViewedTC = (messageId: string) =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>,
           getState: () => RootStateType) => {
        let response = await dialogsApi.checkMessageViewed(messageId);
        if (response !== getState().messagesPage.messagesWithUser.filter(m => m.id === messageId)[0].viewed)
            dispatch(actions.setIsMessageViewed(response,messageId))
    }

export const filterMessagesTC = (userID:number,filterDate: string) =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
        let response = await dialogsApi.getMessageAfterThisDate(userID,filterDate);
       dispatch(actions.setMessagesWithUser(response))
    }


export type MessagesPageStateType = typeof initialState
export type MessagesActionType =
    ReturnType<typeof actions.setDialogs>
    | ReturnType<typeof actions.setNewMessagesCont>
    | ReturnType<typeof actions.setUserIdForMessaging>
    | ReturnType<typeof actions.setMessagesWithUser>
    | ReturnType<typeof actions.setNewMessageText>
    | ReturnType<typeof actions.addNewMessage>
    | ReturnType<typeof actions.deleteMessage>
    | ReturnType<typeof actions.setIsMessageViewed>