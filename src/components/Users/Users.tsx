import React, {Dispatch, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ActionsType, RootStateType} from "../../redux/redux-store";
import {actions, UserType} from "../../redux/usersReduser";
import {User} from "./User";
import styled from "styled-components";
import smallUnknownPhoto from "../../assets/images/UnknowIcon.svg";

export const Users = () => {
    const users=useSelector<RootStateType,UserType[]>(state=>state.usersPage.users)
    const dispatch = useDispatch<Dispatch<ActionsType>>()

    useEffect(()=>{
        console.log("effect")
        dispatch(actions.setUsers([
            {
                id: 1,
                name: "Dima Losev",
                status: "I am frontend Developer",
                photos: {
                    small: smallUnknownPhoto,
                    large:smallUnknownPhoto
                },
                follow: false
            },
            {
                id: 2,
                name: "Tanya Loseva",
                status: "I am Sale Assistant",
                photos: {
                    small: smallUnknownPhoto,
                    large: smallUnknownPhoto
                },
                follow: true
            },
            {
                id: 3,
                name: "Nikita Losev",
                status: "I am a boy",
                photos: {
                    small: smallUnknownPhoto,
                    large: smallUnknownPhoto
                },
                follow: true
            },
            {
                id: 4,
                name: "Alesja Loseva",
                status: "I am a girl",
                photos: {
                    small: smallUnknownPhoto,
                    large: smallUnknownPhoto
                },
                follow: true
            }
        ]))},[])

    return (
        <UsersWrapper>
            <UserListTitle>List of users</UserListTitle>
            <UserList>
                {users.map(u=><User key={u.id} user={u}/>)}
            </UserList>
        </UsersWrapper>
    );
};

const UserListTitle = styled.h2`
    padding: 10px;
 color: aqua;
`
const UserList = styled.ul`

`
const UsersWrapper = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
`