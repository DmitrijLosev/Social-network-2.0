import {ActionsType, ThunkCommonType} from "./redux-store";
import {profileApi, ProfileType} from "../api/api-profile";
import {commonActions} from "./app-reducer";
import {PostFormType} from "../components/Profile/MyPosts/MyPosts";


const ADD_POST = "PROFILE/ADD-POST" as const
const LIKE_POST = "PROFILE/LIKE-POST" as const
const DISLIKE_POST = "PROFILE/DISLIKE-POST" as const
const DELETE_POST = "PROFILE/DELETE-POST" as const
const SET_PROFILE = "PROFILE/SET-PROFILE" as const
const SET_PROFILE_STATUS = "PROFILE/SET-PROFILE-STATUS" as const

const initialState = {
    posts: [
        {id: 1, post: "Hello! It's my first post!", likesCount: 10, dislikesCount: 0},
        {id: 2, post: "How are you?", likesCount: 19, dislikesCount: 2},
        {id: 3, post: "JS is the power of magic!", likesCount: 11, dislikesCount: 5},
    ] as PostType[],
    profile:null as ProfileType | null,
    status:''
}

export const profileReducer = (state: ProfilePageStateType = initialState, action: ActionsType): ProfilePageStateType => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state, posts: [{
                    id: state.posts.length + 1,
                    post: action.post,
                    likesCount: 0,
                    dislikesCount: 0
                }, ...state.posts]
            }

        case LIKE_POST:
            return {...state,
                posts: state.posts.map(p=>p.id === action.postId ?
                    {...p, likesCount:p.likesCount+1} : p)}
        case DISLIKE_POST:
            return {...state,
                posts: state.posts.map(p=>p.id === action.postId ?
                    {...p, dislikesCount:p.dislikesCount+1} : p)}
        case DELETE_POST:
            return {...state,posts: state.posts.filter(p=>p.id !== action.postId)}
        case SET_PROFILE:
            return {...state,profile: action.profile}
        case SET_PROFILE_STATUS:
            return {...state,status: action.status}
        default:
            return state

    }
}
export const actions = {
    addPost:(post:string)=>({type: ADD_POST, post})  as const,
    likePost: (postId: number) => ({type: LIKE_POST, postId}) as const,
    dislikePost: (postId: number) => ({type: DISLIKE_POST, postId}) as const,
    deletePost: (postId: number) => ({type: DELETE_POST, postId}) as const,
    setProfile:(profile:ProfileType)=>({type: SET_PROFILE, profile}) as const,
    setStatus:(status:string)=>({type: SET_PROFILE_STATUS, status}) as const
}

export const getProfile = (userId:string):ThunkCommonType =>async (dispatch,getState) => {
    if(userId && +userId !== getState().authPage.ownerId) {
        dispatch(commonActions.setIsFetching(true))
        let res = await Promise.all([profileApi.getProfile(+userId),await profileApi.getStatus(+userId)])
        dispatch(actions.setProfile(res[0]))
        dispatch(actions.setStatus(res[1]))
    } else {
        let res = await profileApi.getStatus(getState().authPage.ownerId!)
        dispatch(actions.setProfile(getState().authPage.ownerProfile!));
        dispatch(actions.setStatus(res))
    }

    dispatch(commonActions.setIsFetching(false))
}

export const updateStatus = (status:string):ThunkCommonType =>async (dispatch) => {
    dispatch(commonActions.setIsFetching(true))
    let res = await profileApi.setStatus(status)
    if(res.resultCode===0){
        dispatch(actions.setStatus(status))
    }
    dispatch(commonActions.setIsFetching(false))
}





export type PostType = {
    id: number
    post: string
    likesCount: number
    dislikesCount: number
}
export type ProfilePageStateType = typeof initialState;
export type ProfileActionsType =ReturnType<typeof actions.addPost>  | ReturnType<typeof actions.likePost> | ReturnType<typeof actions.dislikePost> | ReturnType<typeof actions.deletePost> | ReturnType<typeof actions.setProfile> | ReturnType<typeof actions.setStatus>
