import React, {useEffect} from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {getProfile} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useAuth} from "../Commons/Hooks/useAuth";


export const Profile: React.FC = () => {

    const dispatch = useAppDispatch()
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        dispatch(getProfile(id))
    }, [])


    const profilePageState = useAppSelector(state => state.profilePage)


    return (
        <>
            <ProfileInfo profile={profilePageState.profile}/>
            <MyPosts posts={profilePageState.posts} typingPostText={profilePageState.typingPostText}/>
        </>
    );
};



