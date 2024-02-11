import React, {useEffect} from "react";
import {actions, getUsers} from "../../redux/users-reducer";
import {User} from "./User";
import styled from "styled-components";
import {ConfigProvider, Pagination, PaginationProps} from "antd";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

export const Users = () => {
    const {users,totalUsersCount,pageSize,currentPage} = useAppSelector(state => state.usersPage)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers())
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