import React from "react";
import styled from "styled-components";
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return (
        <StyledMain>
            <div id="profile">
                <div>ProfilePhoto</div>
                <div>ProfileInfo</div>
            </div>
            <MyPosts/>
        </StyledMain>
    );
};


const StyledMain = styled.main`
  grid-area: m;
  background-color: cadetblue;
  
  div[id="profile"] {
    min-height: 100px;
  }
  padding: 10px 10px;
`
