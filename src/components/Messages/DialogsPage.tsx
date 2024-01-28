import React, {useEffect, useState} from "react";
import {Avatar, Button, List} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {actions, MessagesPageStateType, setDialogsTC, upInDialogListTC} from "../../redux/messages-reducer";
import {RootStateType} from "../../redux/redux-store";
import styled from "styled-components";
import unknown from "../../assets/images/UnknowIcon.svg";
import {NavLink} from "react-router-dom";


export const DialogsPage = () => {


    const dispatch = useDispatch()
    const {dialogs, countDialogsPageForShow,filterForDialogs} = useSelector<RootStateType, MessagesPageStateType>(state => state.messagesPage)


    useEffect(() => {
        dispatch(setDialogsTC());
        return () =>{
            dispatch(actions.setFilterForDialogs("part"));
        dispatch(actions.setCountDialogsPageForShow(1))} ;
    }, []);

    const upInDialogListClickHandler = (userId: number) => {
        dispatch(upInDialogListTC(userId))
    }

    let filteredDialogs = dialogs;
    if (filterForDialogs ==="part" ) {
        if (filteredDialogs.length>=10*countDialogsPageForShow)
        { filteredDialogs = filteredDialogs.filter((el, index)=> index <  10*countDialogsPageForShow)}
        else {
            filteredDialogs = filteredDialogs.length % 10 === 0 ? filteredDialogs.filter((el, index)=> index <  10 * countDialogsPageForShow)
                : filteredDialogs.filter((el, index)=> index <   10 * (countDialogsPageForShow-1) + dialogs.length % 10)
        }
    }
    const showMoreButtonHandler = () =>{
        if(dialogs.length <= 10*(countDialogsPageForShow+1)) {
            dispatch(actions.setFilterForDialogs("all"))
        }
       dispatch(actions.setCountDialogsPageForShow(countDialogsPageForShow+1))
    }
    const setFilterAllHandler = () =>{
        dispatch(actions.setFilterForDialogs("all"))
    }





    return (
        <DialogsWrapper>
            <DialogsTitle>List of Dialogs</DialogsTitle>
            <List
                loading={false}
                itemLayout="horizontal"
                dataSource={filteredDialogs}
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
            {dialogs.length > 10 && filterForDialogs !== "all" &&
                <ButtonWrapper>
                    <Button type="primary" size={"large"} onClick={showMoreButtonHandler} >Show
                        more...</Button>
                    <Button type="primary" size={"large"} onClick={setFilterAllHandler} >Show
                        all</Button>
                </ButtonWrapper>
            }
        </DialogsWrapper>
    );
};

const DialogsTitle = styled.h2`
  padding: 10px;
  color: aqua;
  text-align: center;
`
const DialogsWrapper = styled.div`
  a {
    font-size: 18px;
  }
`

const ButtonWrapper = styled.div`
  justify-content: center;
  display: flex;
  gap: 10px;

`