import React, {useEffect} from "react";
import {actions} from "../../redux/users-reducer";
import {User} from "./User";
import styled from "styled-components";
import {usersApi} from "../../api/api-users";
import {ConfigProvider, Pagination, PaginationProps} from "antd";
import {commonActions} from "../../redux/app-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

export const Users = () => {
    const {users,totalUsersCount,pageSize,currentPage} = useAppSelector(state => state.usersPage)
    const dispatch = useAppDispatch()

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