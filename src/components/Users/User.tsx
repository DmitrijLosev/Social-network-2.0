import React from "react";
import {actions} from "../../redux/users-reducer";
import styled from "styled-components";
import follow from "./../../assets/images/follower.svg"
import unfollow from "./../../assets/images/unfollower.svg"
import {usersApi, UserType} from "../../api/api-users";
import unknown from "../../assets/images/UnknowIcon.svg"
import message from "../../assets/images/Message.svg"
import {NavLink, useHistory} from "react-router-dom";
import {commonActions} from "../../redux/app-reducer";
import {useAppDispatch} from "../../redux/hooks";


export const User: React.FC<{ user: UserType }> = React.memo(({user}) => {

        const dispatch = useAppDispatch()
        const history = useHistory()

        const followButtonHandler = () => {
            (async () => {
                dispatch(commonActions.setIsFetching(true))
                let res = await usersApi.followUser(user.id)
                if (res.resultCode === 0) {
                    dispatch(actions.follow(user.id))
                }
                dispatch(commonActions.setIsFetching(false))
            }) ()
            }

        const unfollowButtonHandler = () => {
            (async () => {
                dispatch(commonActions.setIsFetching(true))
                let res = await usersApi.unfollowUser(user.id)
                if (res.resultCode === 0) {
                    dispatch(actions.unfollow(user.id))
                }
                dispatch(commonActions.setIsFetching(false))
            }) ()
        }

        const startMessagingHandler = () => {
            history.push(`/messages/${user.id}`)
        }


        return (
            <StyledUser>
                <NavLink to={`/profile/${user.id}`}>
                    <UserPhoto src={user.photos.small ? user.photos.small : unknown} alt={"user photo here"}/>
                </NavLink>
                <UserInfoWrapper>
                    <UserName>{user.name}</UserName>
                    <UserStatus>{user.status}</UserStatus>
                </UserInfoWrapper>
                <FollowButtomWrapper>
                    <StyledFollowButton onClick={followButtonHandler} disabled={user.followed}>
                        <img src={follow}
                             alt={"follow button here"}/></StyledFollowButton>
                    <StyledFollowButton onClick={unfollowButtonHandler} disabled={!user.followed}>
                        <img src={unfollow}
                             alt={"unfollow button here"}/></StyledFollowButton>
                    <StyledFollowButton onClick={startMessagingHandler}>
                        <img src={message}
                             alt={"unfollow button here"}/>
                    </StyledFollowButton>
                </FollowButtomWrapper>

            </StyledUser>
        );
    }
)

const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;

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