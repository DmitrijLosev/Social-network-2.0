import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {DialogActionsType, dialogReducer} from "./dialog-reducer";
import {UsersActionsType, usersReducer} from "./users-reduser";
import {MessagesActionType, messagesReducer} from "./messages-reducer";
import thunk from "redux-thunk";


const rootReducer=combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage:usersReducer,
    messagesPage:messagesReducer
});
export const store = createStore(rootReducer,undefined,applyMiddleware(thunk));


export type ActionsType=ProfileActionsType | DialogActionsType | UsersActionsType | MessagesActionType



export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store=store