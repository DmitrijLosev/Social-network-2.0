import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {UsersActionsType, usersReducer} from "./users-reducer";
import {MessagesActionType, messagesReducer} from "./messages-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
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
export type ThunkCommonType = ThunkAction<void, RootStateType, unknown, ActionsType>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, ActionsType>

// @ts-ignore
window.store=store