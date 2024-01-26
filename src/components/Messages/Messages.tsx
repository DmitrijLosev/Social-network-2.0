import React, {useEffect} from "react";
import {Avatar, Button, FloatButton, List} from "antd";
import {DialogsType} from "../../api/api-dialogs";
import {useDispatch, useSelector} from "react-redux";
import {setDialogsTC, upInDialogListTC} from "../../redux/messages-reducer";
import {RootStateType} from "../../redux/redux-store";
import styled from "styled-components";
import unknown from "../../assets/images/UnknowIcon.svg";
import {NavLink} from "react-router-dom";

export const Messages = () => {

    const dispatch = useDispatch()
    const dialogs = useSelector<RootStateType, DialogsType[]>(state => state.messagesPage.dialogs)

    useEffect(() => {
        dispatch(setDialogsTC())
    }, [])

    const upInDialogListClickHandler = (userId: number) => {
        dispatch(upInDialogListTC(userId))
    }

    return (
        <div>
            <DialogsTitle>List of Dialogs</DialogsTitle>
            <List
                loading={false}
                itemLayout="horizontal"
                dataSource={dialogs}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photos.small ? item.photos.small : unknown}/>}
                            title={<NavLink to={`/messages/${item.id}`}
                                            onClick={() => upInDialogListClickHandler(item.id)}>{item.userName}
                            </NavLink>}
                            description={`New Messages : ${item.newMessagesCount}  |  
                             Last Dialog Activity : ${item.lastDialogActivityDate.slice(0, 10) + " " + item.lastDialogActivityDate.slice(11, 19)}  |   
                             Last Activity : ${item.lastUserActivityDate.slice(0, 10) + " " +
                            item.lastUserActivityDate.slice(11, 19)}`}
                        />
                    </List.Item>
                )}
            />

        </div>
    );
};

const DialogsTitle = styled.h2`
  padding: 10px;
  color: aqua;
  text-align: center;
`