import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import { RootStateType} from "../../redux/redux-store";
import {useSelector} from "react-redux";
import {ProfilePageStateType} from "../../redux/profile-reducer";




export const Profile: React.FC = () => {

    const profilePageState=useSelector<RootStateType,ProfilePageStateType>(state=>state.profilePage)

    return (
        <>
            <ProfileInfo/>
            <MyPosts posts={profilePageState.posts} typingPostText={profilePageState.typingPostText}/>
        </>
    );
};



