import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageStateType, RootStateType} from "../../redux/redux-store";
import {useSelector} from "react-redux";




export const Profile: React.FC = () => {

    const profilePageState=useSelector<RootStateType,ProfilePageStateType>(state=>state.profilePage)

    return (
        <>
            <ProfileInfo/>
            <MyPosts posts={profilePageState.posts} typingPostText={profilePageState.typingPostText}/>
        </>
    );
};



