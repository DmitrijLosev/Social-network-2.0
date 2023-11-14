import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo";
import {PostsType} from "../../App";

type ProfilePropsType = {
    profilePage:PostsType
    addNewPost:(newPostText:string)=>void
}
export const Profile: React.FC<ProfilePropsType> = ({profilePage,addNewPost}) => {
    return (
        <>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts} addNewPost={addNewPost}/>
        </>
    );
};



