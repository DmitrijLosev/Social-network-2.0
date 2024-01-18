import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {PostType, profileReducer} from "../redux/profile-reducer";
import {dialogReducer, DialogUserType, MessageType} from "../redux/dialog-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer
})

const initialAppState= {
    posts: [
        {id: 1, post: "Hello! It's my first post!", likesCount: 10, dislikesCount: 0},
        {id: 2, post: "How are you?", likesCount: 19, dislikesCount: 2},
        {id: 3, post: "JS is the power of magic!", likesCount: 11, dislikesCount: 5},
    ] as PostType[],
    typingPostText: "",
    dialogUsers: [
        {id: 1, name: "Dima"},
        {id: 2, name: "Tanya"},
        {id: 3, name: "Misha"},
        {id: 4, name: "Igor"},
    ] as DialogUserType[],
    messages: [
        {id: 1, message: "Hello!"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "How's your business?"},
        {id: 4, message: "What are news?"}
    ] as MessageType[],
    typingDialogMessage: ""
}

export type RootStateType=ReturnType<typeof rootReducer>

const storyBookStore = createStore(rootReducer,  initialAppState as RootStateType & undefined )

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}