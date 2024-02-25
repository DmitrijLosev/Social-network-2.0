import React, {useState} from "react";
import styled from "styled-components";
import {ProfileType} from "../../../api/api-profile";
import unknown from "../../../assets/images/UnknowIcon.svg"
import {Status} from "./Status/Status";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    ownerId: number | null
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile,ownerId}) => {



    return (<>
            {profile && <ProfileWrapper>
                <ProfilePhoto src={profile.photos.large ? profile.photos.large : unknown}
                                   alt={"profile photo here"}/>
                <ProfileInfoWrapper>
                    <NameWrapper>{profile.fullName}</NameWrapper>
                    <Status isOwner={ownerId === profile.userId}/>
                </ProfileInfoWrapper>
            </ProfileWrapper>}

        </>
    );
};


const ProfileWrapper = styled.div`
  padding: 20px;
  min-height: 100px;
  display: flex;
  justify-content: space-around;
`
const ProfilePhoto = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
`
const ProfileInfoWrapper = styled.div`
display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`
const NameWrapper = styled.h3`
    padding: 10px;
`