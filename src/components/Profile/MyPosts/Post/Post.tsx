import React from "react";
import smallUnknownPhoto from "./../../../../assets/images/UnknowIcon.svg"
import styled from "styled-components";
import {Icon} from "../../../Commons/Icon/Icon";
import {actions, PostType} from "../../../../redux/profile-reducer";
import {useAppDispatch} from "../../../../redux/hooks";

export const Post: React.FC<{post:PostType }> =
    ({post}) => {
    const dispatch=useAppDispatch()
        const likeClickHandler = () => {
            dispatch(actions.likePost(post.id))
        }
        const dislikeClickHandler = () => {
        dispatch(actions.dislikePost(post.id))
        }
        const deletePostClickHandler = () => {
        dispatch(actions.deletePost(post.id))
        }

        return (<>
                <PostWrapper>
                    <PostInfoWrapper>
                        <SmallProfilePhoto src={smallUnknownPhoto} alt={"Small user's photo  is here"}/>
                        <StyledPost>{post.post}</StyledPost>
                    </PostInfoWrapper>
                    <LikeAndDislikeButtonList>
                        <li>
                            <button onClick={likeClickHandler}><Icon iconId="like" width="20" height="20"/></button>
                            <span>{post.likesCount}</span>
                        </li>
                        <li>
                            <button onClick={dislikeClickHandler}><Icon iconId="dislike" width="20" height="20"/>
                            </button>
                            <span>{post.dislikesCount}</span>
                        </li>
                        <li>
                            <button onClick={deletePostClickHandler}><Icon iconId="delete" width="20" height="20"
                                                                           viewBox="0 0 70 70"/></button>
                        </li>
                    </LikeAndDislikeButtonList>
                </PostWrapper>
            </>
        )
            ;
    };

const SmallProfilePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;

`
const StyledPost = styled.p`
overflow: hidden;

`
const PostInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`

const PostWrapper = styled.div`
  max-width: 700px;
  
  background-color: lightblue;
  border-radius: 5px;
display: flex;
  flex-direction: column;
  button {
    background-color: unset;
    border: none;
  }
`
const LikeAndDislikeButtonList = styled.ul`
  display: flex;
  gap: 10px;
  justify-content: end;
  padding: 5px 0 0 350px;
`