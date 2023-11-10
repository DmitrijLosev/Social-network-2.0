import React from "react";
import {Post} from "./Post/Post";
import styled from "styled-components";

export const MyPosts = () => {
    return (
        <MyPostsWrapper>
            <StyledTitle>My Posts</StyledTitle>
            <StyledTextarea></StyledTextarea>
            <StyledBtn>Add post</StyledBtn>
            <Post post="Hello! It's my first post!" likesCount={10} dislikesCount={0}/>
            <Post post="How are you?" likesCount={19} dislikesCount={2}/>
            <Post post="JS is the power of magic!" likesCount={11} dislikesCount={5}/>
        </MyPostsWrapper>
    );
};

const MyPostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledTitle = styled.h3`

`
const StyledTextarea = styled.textarea`
  max-width: 400px;
  min-height: 50px;
  resize: unset;
`

const StyledBtn = styled.button`
width: 100px;
`