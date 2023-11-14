import {rerenderEntireTree} from "../render";

export type StateType=typeof state
export let state = {
    dialogsPage: {
        dialogUsers: [
            {id: 1, name: "Dima"},
            {id: 2, name: "Tanya"},
            {id: 3, name: "Misha"},
            {id: 4, name: "Igor"},
        ],
        messages: [
            {id: 1, message: "Hello!"},
            {id: 2, message: "How are you?"},
            {id: 3, message: "How's your business?"},
            {id: 4, message: "What are news?"},
        ]
    },
    profilePage: {
        posts: [
            {id: 1, post: "Hello! It's my first post!", likesCount: 10, dislikesCount: 0},
            {id: 2, post: "How are you?", likesCount: 19, dislikesCount: 2},
            {id: 3, post: "JS is the power of magic!", likesCount: 11, dislikesCount: 5},
        ]
    }
}
console.log(state)

export const addNewPost = (postText: string) => {
    state.profilePage.posts.push({
        id: state.profilePage.posts.length + 1,
        post: postText,
        likesCount: 0,
        dislikesCount: 0,
    });

    rerenderEntireTree(state);
};