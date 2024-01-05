import {combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {DialogActionsType, dialogReducer} from "./dialog-reducer";


const rootReducer=combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer
});
export const store = createStore(rootReducer);


export type ActionsType=ProfileActionsType | DialogActionsType



export type RootStateType = ReturnType<typeof rootReducer>