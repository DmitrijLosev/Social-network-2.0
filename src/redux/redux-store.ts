import {combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {DialogActionsType, dialogReducer} from "./dialog-reducer";
import {UsersActionsType, usersReducer} from "./usersReduser";


const rootReducer=combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage:usersReducer
});
export const store = createStore(rootReducer);


export type ActionsType=ProfileActionsType | DialogActionsType | UsersActionsType



export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store=store