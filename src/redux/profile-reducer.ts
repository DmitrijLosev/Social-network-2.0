import {ActionsType, ProfilePageStateType} from "./state";

const ADD_POST = "ADD-POST" as const
const CHANGE_POST = "CHANGE-POST" as const

export type ProfileActionsType=ReturnType<typeof addPostAC> | ReturnType<typeof changePostAC>


 export const profileReducer = (state: ProfilePageStateType, action: ActionsType) => {

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

