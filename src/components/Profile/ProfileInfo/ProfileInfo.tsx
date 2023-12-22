import React from "react";
import styled from "styled-components";

export const ProfileInfo = () => {
    return (
        <ProfileWrapper>
            <div>ProfilePhoto</div>
            <div>ProfileInfo</div>
        </ProfileWrapper>
    );
};


const ProfileWrapper = styled.div`
  min-height: 100px;
`
