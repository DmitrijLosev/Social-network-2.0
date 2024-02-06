import React, {Dispatch, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ActionsType, RootStateType} from "../../redux/redux-store";
import {actions, UsersPageStateType} from "../../redux/users-reduser";
import {User} from "./User";
import styled from "styled-components";
import {usersApi} from "../../api/api-users";
import {ConfigProvider, Pagination, PaginationProps} from "antd";
import {commonActions} from "../../redux/app-reducer";

export const Users = () => {
    const {users,totalUsersCount,pageSize,currentPage} = useSelector<RootStateType, UsersPageStateType>(state => state.usersPage)
    const dispatch = useDispatch<Dispatch<ActionsType>>()

    useEffect(() => {

        (async () => {
            dispatch(commonActions.setIsFetching(true))
            let response = await usersApi.getUsers(pageSize, currentPage)
            dispatch(actions.setUsers(response.items))
            dispatch(actions.setTotalUsersCount(response.totalCount))
            dispatch(commonActions.setIsFetching(false))
        }) ()

    }, [currentPage,pageSize])

    const onPaginationChange: PaginationProps['onChange'] = (pageSize,pageNumber) => {
        dispatch(actions.setCurrentPage(pageSize))
        dispatch(actions.setPageSize(pageNumber))
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Pagination: {
                        itemActiveBg:"lightblue",
                        colorBgContainer:"lightskyblue",
                        colorBorder:"transparent",
                    },
                },
            }}
        >
        <UsersWrapper>
            <UserListTitle>List of users</UserListTitle>
            <Pagination showQuickJumper defaultCurrent={1} total={totalUsersCount} onChange={onPaginationChange} />
            <UserList>
                {users.map(u => <User key={u.id} user={u}/>)}
            </UserList>
        </UsersWrapper>
        </ConfigProvider>
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