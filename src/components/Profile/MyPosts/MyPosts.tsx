import React, {Dispatch, LegacyRef} from "react";
import {Post} from "./Post/Post";
import styled from "styled-components";
import {actions, PostType, ProfileActionsType} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";




type MyPostsPropsType = {
    posts: PostType[]
    typingPostText: string
}

export const MyPosts: React.FC<MyPostsPropsType> = ({posts, typingPostText}) => {

    const dispatch=useDispatch<Dispatch<ProfileActionsType>>()

    const newPostElement: LegacyRef<HTMLTextAreaElement> = React.createRef();
    const addPost = () => {
        if (typingPostText) {
            dispatch(actions.addPost)
        }

    }
    const onPostChange = () => {
        if (newPostElement.current) {
            dispatch(actions.changePost(newPostElement.current.value))
        }
    }


    return (
        <MyPostsWrapper>
            <StyledTitle>My Posts</StyledTitle>
            <StyledTextarea ref={newPostElement} value={typingPostText} onChange={onPostChange}
                            placeholder={"Enter new post"}></StyledTextarea>
            <StyledBtn onClick={addPost}>Add post</StyledBtn>
            {posts.map(p => <Post key={p.id} post={p}/>)}
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