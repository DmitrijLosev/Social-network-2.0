import {DialogUsersType, MessagesType, PostType} from "../App";
import {profileReducer,ProfileActionsType} from "./profile-reducer";
import {DialogActionsType, dialogReducer} from "./dialog-reducer";

// export type ActionsType=ProfileActionsType | DialogActionsType

/*export type StoreType = {
    _state: RootStateType
    _rerender: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch:(action:ActionsType)=>void
}*/
/*export type DialogsPageStateType =DialogUsersType & MessagesType & {typingDialogMessage:string}
export type ProfilePageStateType = { posts: PostType[],  typingPostText:string }
export type RootStateType = {
    dialogsPage: DialogsPageStateType
    profilePage: ProfilePageStateType
}*/

/*
export const store:StoreType = {
    _state: {
        dialogsPage: {
            dialogUsers: [
                {id: 1, name: "Dima"},
                {id: 2, name: "Tanya"},
                {id: 3, name: "Misha"},
                {id: 4, name: "Igor"},
            ],
            messages: [
                {id: 1, message: "Hello!"},
                {id: 2, message: "How are you?"},
                {id: 3, message: "How's your business?"},
                {id: 4, message: "What are news?"}
            ],
            typingDialogMessage:""
        }
        ,
        profilePage: {
            posts: [
                {id: 1, post: "Hello! It's my first post!", likesCount: 10, dislikesCount: 0},
                {id: 2, post: "How are you?", likesCount: 19, dislikesCount: 2},
                {id: 3, post: "JS is the power of magic!", likesCount: 11, dislikesCount: 5},
            ],
            typingPostText: "",
        }
    },
    _rerender() {
        console.log("state was changed")
    },
    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._rerender = observer
    },
    dispatch(action:ActionsType) {
        profileReducer(this._state.profilePage, action);
        dialogReducer(this._state.dialogsPage, action);
        this._rerender()
    }
}
*/




