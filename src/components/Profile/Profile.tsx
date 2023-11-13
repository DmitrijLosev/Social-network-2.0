import React from "react";
import styled from "styled-components";
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile:React.FC = (props) => {
    return (
        <>
            <ProfileWrapper>
                <div>ProfilePhoto</div>
                <div>ProfileInfo</div>
            </ProfileWrapper>
            <MyPosts/>
        </>
    );
};

const ProfileWrapper = styled.div`
  min-height: 100px;
`


