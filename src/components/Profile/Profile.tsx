import React, {Dispatch} from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo";
import {ProfilePageStateType} from "../../redux/state";
import {ProfileActionsType} from "../../redux/profile-reducer";


type ProfilePropsType = {
    profilePage:ProfilePageStateType
    dispatch:Dispatch<ProfileActionsType>
}
export const Profile: React.FC<ProfilePropsType> = ({profilePage, dispatch}) => {
    return (
        <>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts} typingPostText={profilePage.typingPostText} dispatch={dispatch}/>
        </>
    );
};



