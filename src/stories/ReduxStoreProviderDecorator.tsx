import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {PostType, profileReducer} from "../redux/profile-reducer";
import {usersReducer} from "../redux/users-reducer";
import {DialogsFilterType, messagesReducer} from "../redux/messages-reducer";
import {UserType} from "../api/api-users";
import {DialogsType, MessageType} from "../api/api-dialogs";
import thunk from "redux-thunk";
import {appReducer} from "../redux/app-reducer";
import {ProfileType} from "../api/api-profile";
import {authReducer} from "../redux/auth-reducer";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    messagesPage: messagesReducer,
    appPage: appReducer,
    authPage:authReducer
})

const initialAppState = {
    posts: [
        {id: 1, post: "Hello! It's my first post!", likesCount: 10, dislikesCount: 0},
        {id: 2, post: "How are you?", likesCount: 19, dislikesCount: 2},
        {id: 3, post: "JS is the power of magic!", likesCount: 11, dislikesCount: 5},
    ] as PostType[],
    typingPostText: "",
    users: [] as UserType[],
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    dialogs: [] as DialogsType[],
    newMessagesCount: 0,
    userIdForMessaging: null as number | null,
    messagesWithUser: [] as MessageType[],
    newMessageText: "",
    countDialogsPageForShow: 1,
    filterForDialogs: "part" as DialogsFilterType,
    messagesPageNumber: 1,
    totalMessagesCount: 0,
    isFetching: false,
    profile:{} as ProfileType,
    isAuth: false,
    ownerId:null as number | null,
    ownerEmail:null as string | null,
    ownerLogin:null as string | null,
    ownerProfile:null as ProfileType | null
}

export type RootStateType = ReturnType<typeof rootReducer>

const storyBookStore = createStore(rootReducer, initialAppState as RootStateType & undefined, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}