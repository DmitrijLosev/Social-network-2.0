import React, {Dispatch, useEffect} from "react";
import {actions, UserType} from "../../redux/usersReduser";
import styled from "styled-components";
import follow from "./../../assets/images/follower.svg"
import unfollow from "./../../assets/images/unfollower.svg"
import {useDispatch} from "react-redux";
import {ActionsType} from "../../redux/redux-store";
import smallUnknownPhoto from "../../assets/images/UnknowIcon.svg";

export const User: React.FC<{ user: UserType }> = React.memo(({user}) => {

        const dispatch = useDispatch<Dispatch<ActionsType>>()

        const followButtonHandler = () => {
            dispatch(actions.follow(user.id))
        }
        const unfollowButtonHandler = () => {
            dispatch(actions.unfollow(user.id))
        }
        return (
            <StyledUser>
                <UserPhoto src={user.photos.small} alt={"user photo here"}/>
                <UserInfoWrapper>
                    <UserName>{user.name}</UserName>
                    <UserStatus>{user.status}</UserStatus>
                </UserInfoWrapper>
                <FollowButtomWrapper>
                    <StyledFollowButton onClick={followButtonHandler} disabled={user.follow}><img src={follow}
                                                                                                  alt={"follow button here"}/></StyledFollowButton>
                    <StyledFollowButton onClick={unfollowButtonHandler} disabled={!user.follow}><img src={unfollow}
                                                                                                     alt={"unfollow button here"}/></StyledFollowButton>
                </FollowButtomWrapper>

            </StyledUser>
        );
    }
)

const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;

`
const StyledUser = styled.li`
  display: flex;
  max-width: 700px;
  gap: 30px;
  padding: 10px;
  border: 2px solid lightskyblue;
  margin: 5px;
  justify-content: space-between;
  border-radius: 10px;
`
const StyledFollowButton = styled.button`
  & > img {
    height: 30px;
    width: 30px;;
  }

  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: none;

  &:disabled {
    opacity: 50%;
  }

  &:hover {
    transform: translate(0, 2px);
  }
`
const UserName = styled.h3`

`
const UserStatus = styled.h4`
  font-style: italic;
  font-weight: normal;
`
const FollowButtomWrapper = styled.div`
  align-self: end;
  display: flex;
  gap: 5px;
`
const UserInfoWrapper = styled.div`
  flex-grow: 1;
  color: darkslateblue;
`