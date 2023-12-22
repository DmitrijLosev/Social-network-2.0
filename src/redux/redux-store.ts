import {combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {DialogActionsType, dialogReducer} from "./dialog-reducer";
import {DialogUsersType, MessagesType, PostType} from "../App";

export const store = createStore(combineReducers({
            profilePage: profileReducer,
            dialogsPage: dialogReducer
        }
    )
);

export type ActionsType=ProfileActionsType | DialogActionsType

export type DialogsPageStateType =DialogUsersType & MessagesType & {typingDialogMessage:string}
export type ProfilePageStateType = { posts: PostType[],  typingPostText:string }
export type RootStateType = {
    dialogsPage: DialogsPageStateType
    profilePage: ProfilePageStateType
}