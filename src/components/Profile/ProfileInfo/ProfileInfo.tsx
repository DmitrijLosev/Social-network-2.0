import React from "react";
import styled from "styled-components";
import {ProfileType} from "../../../api/api-profile";
import unknown from "../../../assets/images/UnknowIcon.svg"

type ProfileInfoPropsType = {
    profile:ProfileType | null
}

export const ProfileInfo:React.FC<ProfileInfoPropsType> = ({profile}) => {

    return (<>
            {profile ?  <ProfileWrapper>
                <div><img src={profile.photos.large ? profile.photos.large : unknown} alt={"profile photo here"}/></div>
                <div>{profile.fullName}</div>
            </ProfileWrapper> :  <div>ProfileInfo</div>}

        </>
    );
};


const ProfileWrapper = styled.div`
  min-height: 100px;
`
