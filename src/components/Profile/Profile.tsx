import React, {useEffect} from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {actions} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {profileApi} from "../../api/api-profile";
import {commonActions} from "../../redux/app-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";


export const Profile: React.FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        let profileId;
        if (id) {
             profileId = id
        } else { profileId = "30556"}

        (async () => {
            dispatch(commonActions.setIsFetching(true))
            let res = await profileApi.getProfile(+profileId)
            dispatch(actions.setProfile(res))
            dispatch(commonActions.setIsFetching(false))
        })()

    }, [])


    const profilePageState = useAppSelector(state => state.profilePage)

    return (
        <>
            <ProfileInfo profile = {profilePageState.profile}/>
            <MyPosts posts={profilePageState.posts} typingPostText={profilePageState.typingPostText}/>
        </>
    );
};



