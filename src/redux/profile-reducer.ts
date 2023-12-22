import {ActionsType, ProfilePageStateType} from "./redux-store";

const ADD_POST = "ADD-POST" as const
const CHANGE_POST = "CHANGE-POST" as const

export type ProfileActionsType=ReturnType<typeof addPostAC> | ReturnType<typeof changePostAC>




const initialState= {
    posts: [
        {id: 1, post: "Hello! It's my first post!", likesCount: 10, dislikesCount: 0},
        {id: 2, post: "How are you?", likesCount: 19, dislikesCount: 2},
        {id: 3, post: "JS is the power of magic!", likesCount: 11, dislikesCount: 5},
    ],
        typingPostText: "",
}

 export const profileReducer = (state: ProfilePageStateType=initialState, action: ActionsType) => {

    switch (action.type) {
        case ADD_POST:
            state.posts.push({
                id: state.posts.length + 1,
                post: state.typingPostText,
                likesCount: 0,
                dislikesCount: 0,
            })
            state.typingPostText="";
            return state;
        case CHANGE_POST:
             state.typingPostText = action.typingPostText
            return state
        default:
            return state

    }
}

export const addPostAC=()=>({type:ADD_POST}) as const
export const changePostAC=(typingPostText:string)=>({type:CHANGE_POST, typingPostText}) as const

