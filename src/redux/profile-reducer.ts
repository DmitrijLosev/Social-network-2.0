import {ActionsType} from "./redux-store";


const ADD_POST = "PROFILE/ADD-POST" as const
const CHANGE_POST = "PROFILE/CHANGE-POST" as const
const LIKE_POST = "PROFILE/LIKE-POST" as const
const DISLIKE_POST = "PROFILE/DISLIKE-POST" as const
const DELETE_POST = "PROFILE/DELETE-POST" as const


const initialState = {
    posts: [
        {id: 1, post: "Hello! It's my first post!", likesCount: 10, dislikesCount: 0},
        {id: 2, post: "How are you?", likesCount: 19, dislikesCount: 2},
        {id: 3, post: "JS is the power of magic!", likesCount: 11, dislikesCount: 5},
    ] as PostType[],
    typingPostText: "",
}

export const profileReducer = (state: ProfilePageStateType = initialState, action: ActionsType): ProfilePageStateType => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state, posts: [...state.posts, {
                    id: state.posts.length + 1,
                    post: state.typingPostText,
                    likesCount: 0,
                    dislikesCount: 0
                }],
                typingPostText: ""
            }
        case CHANGE_POST:
            return {...state, typingPostText: action.typingPostText}
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
        default:
            return state

    }
}
export const actions = {
    addPost: {type: ADD_POST} as const,
    changePost:(typingPostText: string)=>({type: CHANGE_POST, typingPostText}) as const,
    likePost: (postId: number) => ({type: LIKE_POST, postId}) as const,
    dislikePost: (postId: number) => ({type: DISLIKE_POST, postId}) as const,
    deletePost: (postId: number) => ({type: DELETE_POST, postId}) as const
}

export type PostType = {
    id: number
    post: string
    likesCount: number
    dislikesCount: number
}
export type ProfilePageStateType = typeof initialState;
export type ProfileActionsType = typeof actions.addPost | ReturnType<typeof actions.changePost> | ReturnType<typeof actions.likePost> | ReturnType<typeof actions.dislikePost> | ReturnType<typeof actions.deletePost>
