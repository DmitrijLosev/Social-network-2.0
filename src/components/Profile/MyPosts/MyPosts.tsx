import React, {Dispatch, LegacyRef} from "react";
import {Post} from "./Post/Post";
import styled from "styled-components";
import {PostType} from "../../../App";
import {addPostAC, changePostAC, ProfileActionsType} from "../../../redux/profile-reducer";



type MyPostsPropsType = {
    posts: PostType[]
    dispatch:Dispatch<ProfileActionsType>
    typingPostText: string
}

export const MyPosts: React.FC<MyPostsPropsType> = ({posts, dispatch, typingPostText}) => {

    const newPostElement: LegacyRef<HTMLTextAreaElement> = React.createRef();
    const addPost = () => {
        if (typingPostText) {
            dispatch(addPostAC())
        }

    }
    const onPostChange = () => {
        if (newPostElement.current) {
            dispatch(changePostAC(newPostElement.current.value))
        }
    }


    return (
        <MyPostsWrapper>
            <StyledTitle>My Posts</StyledTitle>
            <StyledTextarea ref={newPostElement} value={typingPostText} onChange={onPostChange}
                            placeholder={"Enter new post"}></StyledTextarea>
            <StyledBtn onClick={addPost}>Add post</StyledBtn>
            {posts.map(p => <Post key={p.id} post={p.post} likesCount={p.likesCount}
                                  dislikesCount={p.dislikesCount}/>)}
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
export const StyledTextarea = styled.textarea`
  max-width: 400px;
  min-height: 50px;
  resize: unset;
`

export const StyledBtn = styled.button`
  width: 100px;
  margin-left: 300px;
`