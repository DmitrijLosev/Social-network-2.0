import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {UsersActionsType, usersReducer} from "./users-reduser";
import {MessagesActionType, messagesReducer} from "./messages-reducer";
import thunk from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";


const rootReducer=combineReducers({
    profilePage: profileReducer,
    usersPage:usersReducer,
    messagesPage:messagesReducer,
    appPage:appReducer,
    authPage:authReducer
});
export const store = createStore(rootReducer,undefined,applyMiddleware(thunk));


export type ActionsType=ProfileActionsType | UsersActionsType | MessagesActionType | AppActionsType | AuthActionsType



export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store=store