import React, {ChangeEvent, LegacyRef} from "react";
import {Post} from "./Post/Post";
import styled from "styled-components";
import {PostType} from "../../../App";

type MyPostsPropsType = {
    posts: PostType[]
    addNewPost:(newPostText:string)=>void
}

export const MyPosts: React.FC<MyPostsPropsType> = ({posts,addNewPost}) => {

    const newPostElement: LegacyRef<HTMLTextAreaElement> = React.createRef();
    const addPost = () => {
        if (newPostElement.current) {
            const text: string = newPostElement.current.value;
            addNewPost(text)
            newPostElement.current.value="";
        }
    }


    return (
        <MyPostsWrapper>
            <StyledTitle>My Posts</StyledTitle>
            <StyledTextarea ref={newPostElement}></StyledTextarea>
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