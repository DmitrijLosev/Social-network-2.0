import React from "react";
import {follow, unfollow} from "../../redux/users-reducer";
import styled from "styled-components";
import followUser from "./../../assets/images/follower.svg"
import unfollowUser from "./../../assets/images/unfollower.svg"
import { UserType} from "../../api/api-users";
import unknown from "../../assets/images/UnknowIcon.svg"
import message from "../../assets/images/Message.svg"
import {NavLink, useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";


export const User: React.FC<{ user: UserType }> = React.memo(({user}) => {

        const dispatch = useAppDispatch()
        const history = useHistory()
    const idOfFollowingUsers = useAppSelector(state=>state.usersPage.idOfFollowingUsers)
const isAuth = useAppSelector(state => state.authPage.isAuth)
        const followButtonHandler = () => {
            dispatch(follow(user.id))
            }

        const unfollowButtonHandler = () => {
            dispatch(unfollow(user.id))
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
                    <StyledFollowButton onClick={followButtonHandler} disabled={user.followed ||
                        idOfFollowingUsers.includes(user.id) || !isAuth}>
                        <img src={followUser}
                             alt={"follow button here"}/></StyledFollowButton>
                    <StyledFollowButton onClick={unfollowButtonHandler} disabled={!user.followed ||  idOfFollowingUsers.includes(user.id) || !isAuth}>
                        <img src={unfollowUser}
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