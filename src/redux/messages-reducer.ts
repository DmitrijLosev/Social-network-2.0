import {dialogsApi, DialogsType, MessageType} from "../api/api-dialogs";
import {ThunkDispatch} from "redux-thunk";
import {ActionsType, RootStateType} from "./redux-store";
import {commonActions, SetIsFetchingActionType} from "./app-reducer";
import {profileApi, ProfileType} from "../api/api-profile";

const SET_DIALOGS = "MESSAGES/SET-DIALOGS" as const
const SET_NEW_MESSAGES_COUNT = "MESSAGES/SET-NEW-MESSAGES-COUNT" as const
const SET_USER_ID_FOR_MESSAGING = "MESSAGES/SET-USER-ID-FOR-MESSAGING" as const
const SET_MESSAGES_WITH_USER = "MESSAGES/SET-MESSAGES-WITH-USER" as const
const SET_NEW_MESSAGE_TEXT = "MESSAGES/SET-NEW-MESSAGE-TEXT" as const
const ADD_NEW_MESSAGE = "MESSAGES/ADD-NEW-MESSAGE" as const
const DELETE_MESSAGE = "MESSAGES/DELETE-MESSAGE" as const
const IS_MESSAGE_VIEWED = "MESSAGES/IS-MESSAGE-VIEWED" as const
const SET_FILTER_FOR_DIALOGS = "MESSAGES/SET-FILTER-FOR-DIALOGS" as const
const SET_COUNT_DIALOGS_PAGE_FOR_SHOW = "MESSAGES/SET-COUNT-DIALOGS-PAGE-FOR-SHOW" as const
const SET_NUMBER_MESSAGE_PAGE = "MESSAGES/SET-NUMBER_MESSAGE-PAGE" as const
const SET_MESSAGE_TOTAL_COUNT = "MESSAGES/ SET-MESSAGE-TOTAL-COUNT" as const
const SET_PARTICIPANT_PROFILE = "MESSAGES/ SET-PARTICIPANT-PROFILE" as const

const initialState = {
    dialogs: [] as DialogsType[],
    newMessagesCount: 0,
    userIdForMessaging: null as number | null,
    messagesWithUser: [] as MessageType[],
    newMessageText: "",
    countDialogsPageForShow:1,
    filterForDialogs:"part" as DialogsFilterType,
   messagesPageNumber:1,
    totalMessagesCount:0,
    partisipantProfile:null as null | ProfileType
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
        case SET_FILTER_FOR_DIALOGS :
            return {...state, filterForDialogs: action.filter}
        case SET_COUNT_DIALOGS_PAGE_FOR_SHOW :
            return {...state, countDialogsPageForShow: action.count}
        case SET_NUMBER_MESSAGE_PAGE:
            return {...state, messagesPageNumber: action.number}
        case SET_MESSAGE_TOTAL_COUNT:
            return {...state, totalMessagesCount: action.count}
        case SET_PARTICIPANT_PROFILE:
            return {...state, partisipantProfile: action.profile}
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
    setFilterForDialogs: (filter: DialogsFilterType) =>
        ({type: SET_FILTER_FOR_DIALOGS, filter}) as const,
    setCountDialogsPageForShow: (count:number) =>
        ({type: SET_COUNT_DIALOGS_PAGE_FOR_SHOW, count}) as const,
    setMessagePageNumber: (number:number) =>
        ({type: SET_NUMBER_MESSAGE_PAGE, number}) as const,
    setTotalMessagesCount: (count:number) =>
        ({type: SET_MESSAGE_TOTAL_COUNT, count}) as const,
    setParticipantProfile:(profile:ProfileType) =>
        ({type: SET_PARTICIPANT_PROFILE, profile}) as const,
}

export const sendMessageTC = () => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {
    dispatch(commonActions.setIsFetching(true))
    const userId = getState().messagesPage.userIdForMessaging;
    const messageText = getState().messagesPage.newMessageText
    if (userId) {
        let response = await dialogsApi.sentMessageToUser(userId, messageText)
        if (response.resultCode === 0) {
            await dispatch(setDialogsTC());
            let {deletedBySender, deletedByRecipient, isSpam, distributionId, ...newMessage} = response.data.message;
            dispatch(actions.addNewMessage(newMessage));
        }
        dispatch(commonActions.setIsFetching(false))
    }
}

export const setMessagesWithUserTC = (userId: number) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {
    dispatch(commonActions.setIsFetching(true))
    dispatch(actions.setUserIdForMessaging(userId))
    if (getState().messagesPage.dialogs.length === 0) {
        let response = await dialogsApi.getDialogs()
        dispatch(actions.setDialogs(response))
    }
        let response = await dialogsApi.getDialogWithUser(userId, getState().messagesPage.messagesPageNumber, 10)
        dispatch(actions.setMessagesWithUser(response.items))
        dispatch(actions.setTotalMessagesCount(response.totalCount))
        let res = await profileApi.getProfile(userId)
    if(res.userId) {
        dispatch(actions.setParticipantProfile(res))
    }
    dispatch(commonActions.setIsFetching(false))
}

export const setDialogsTC = () => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    dispatch(commonActions.setIsFetching(true))
    let response = await dialogsApi.getDialogs()
    dispatch(actions.setDialogs(response))
    dispatch(commonActions.setIsFetching(false))
}

export const setNewMessagesCountTC = () => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {
    let response = await dialogsApi.getNewMessagesCount()
    if (response !== getState().messagesPage.newMessagesCount) {
        dispatch(actions.setNewMessagesCont(response))
    }
}
export const upInDialogListTC = (userId: number) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    dispatch(commonActions.setIsFetching(true))
    let response = await dialogsApi.putDialogWithUserInTopOfList(userId);
    if (response.resultCode === 0) {
        let response = await dialogsApi.getDialogs()
        dispatch(actions.setDialogs(response))
    }
    dispatch(commonActions.setIsFetching(false))
}

export const deleteMessageTC = (messageId: string) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    dispatch(commonActions.setIsFetching(true))
    let response = await dialogsApi.deleteMessage(messageId);
    if (response.resultCode === 0) {
        dispatch(actions.deleteMessage(messageId))
    }
    dispatch(commonActions.setIsFetching(false))
}
export const isMessageViewedTC = (messageId: string) =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>,
           getState: () => RootStateType) => {
        dispatch(commonActions.setIsFetching(true))
        let response = await dialogsApi.checkMessageViewed(messageId);
        if (response !== getState().messagesPage.messagesWithUser.filter(m => m.id === messageId)[0].viewed)
            dispatch(actions.setIsMessageViewed(response,messageId))
        dispatch(commonActions.setIsFetching(false))
    }

export const filterMessagesTC = (userID:number,filterDate: string) =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
        dispatch(commonActions.setIsFetching(true))
        let response = await dialogsApi.getMessageAfterThisDate(userID,filterDate);
       dispatch(actions.setMessagesWithUser(response))
        dispatch(actions.setTotalMessagesCount(response.length))
        dispatch(commonActions.setIsFetching(false))
    }

export type DialogsFilterType = "part" | "all"
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
    | ReturnType<typeof actions.setFilterForDialogs>
    | ReturnType<typeof actions.setCountDialogsPageForShow>
    | ReturnType<typeof actions.setMessagePageNumber>
    | ReturnType<typeof actions. setTotalMessagesCount>
    | ReturnType<typeof actions. setParticipantProfile>
|SetIsFetchingActionType
