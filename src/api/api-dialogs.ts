import {GetItemsResponseType} from "./api-users";
import {fetchInstance} from "./fetchInstance";

const {base_Url,settings,getResponse} = fetchInstance()

export const dialogsApi = {
    getDialogs():Promise<DialogsType[]> {
        return getResponse(fetch(`${base_Url}/dialogs `, settings))
    },
    putDialogWithUserInTopOfList(userId:number): Promise<ResponseType> {
        return getResponse(fetch(`${base_Url}/dialogs/${userId}`, {
            ...settings,
            method: "PUT",
        }))
    },
    getDialogWithUser(userId:number,page:number,count:number): Promise<GetItemsResponseType<MessageType[]>> {
        return getResponse(fetch(`${base_Url}/dialogs/${userId}/messages?page=${page}&count=${count}`, settings))
    },
    sentMessageToUser(userId:number,message:string): Promise<ResponseType<{message:ResponseMessageType}>> {
        return getResponse(fetch(`${base_Url}/dialogs/${userId}/messages`, {
            ...settings,
            method: "POST",
            body: JSON.stringify({body:message})
        }))
    },
    checkMessageViewed(messageId:string): Promise<boolean> {
            return getResponse(fetch(`${base_Url}/dialogs/messages/${messageId}/viewed`, settings))
        },
    deleteMessage(messageId:string): Promise<ResponseType> {
        return getResponse(fetch(`${base_Url}/dialogs/messages/${messageId}`, {
            ...settings,
            method: "DELETE",
        }))
    },
    getMessageAfterThisDate(userId:number,date:string): Promise<ResponseMessageType[]> {
        return getResponse(fetch(`${base_Url}/dialogs/${userId}/messages/new?newerThen=${date}`, settings))
    },
    getNewMessagesCount(): Promise<number> {
        return getResponse(fetch(`${base_Url}/dialogs/messages/new/count`, settings))
    }

}

export type DialogsType = {
    id:number
    userName:string
    hasNewMessages:boolean
    lastDialogActivityDate:string
    lastUserActivityDate:string
    newMessagesCount:number
    photos:{small:string,large:string}
}
export type ResponseType<D={}>={
    data:D
    messages:string[]
    fieldsErrors:string[]
    resultCode:number
}

export type MessageType = {
    id:string
    body:string
    translatedBody:null | string
    addedAt:string
    senderId:number
    senderName:string
    recipientId:string
    viewed:boolean}

export type ResponseMessageType = MessageType & {
    deletedBySender:boolean
    deletedByRecipient:boolean
    isSpam:boolean
    distributionId:boolean}

