import React, {ChangeEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {dialogsApi} from "../../api/api-dialogs";
import {actions, MessagesPageStateType, sendMessageTC} from "../../redux/messages-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {Message} from "./Message";
import styled from "styled-components";
import unknown from "../../assets/images/UnknowIcon.svg";
import {Button, Input} from "antd";

const { TextArea } = Input;


export const MessagesWithUser = () => {

    const dispatch = useDispatch()
    const messagesState=useSelector<RootStateType,MessagesPageStateType>(state=>state.messagesPage)

    const userId = useParams<{ id: "string" }>();
    useEffect(()=>{dispatch(actions.setUserIdForMessaging(+userId.id));},[])

    useEffect(() => {

        (async () => {
            if(messagesState.userIdForMessaging){
                let res = await dialogsApi.putDialogWithUserInTopOfList(messagesState.userIdForMessaging)
                if (res.resultCode === 0) {
                    let response = await dialogsApi.getDialogWithUser(messagesState.userIdForMessaging, 1, 10)
                    dispatch(actions.setMessagesWithUser(response.items))
                }
            }
        })()

    }, [messagesState.userIdForMessaging])

    useEffect(()=>{
        if(messagesState.dialogs.length===0) {
            (async () => {
                let response = await dialogsApi.getDialogs()
                dispatch(actions.setDialogs(response))
            }) ()
        }
    },[])

    const onChangeTextareaHandler=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        dispatch(actions.setNewMessageText(e.currentTarget.value))
    }
    const SendMessageHandler=()=>{dispatch(sendMessageTC())}

    return (<>
            <MessagesTitle>Messaging with :</MessagesTitle>
    {messagesState.dialogs.length > 0 && <TitleMessaging>
        <UserPhoto src = {messagesState.dialogs.
        filter(u=>u.id===messagesState.userIdForMessaging)[0].photos.small ? messagesState.dialogs.
        filter(u=>u.id===messagesState.userIdForMessaging)[0].photos.small  : unknown} alt={"user photo here"}/>
        <InfoWrapper>
            <h3>{messagesState.dialogs.
            filter(u=>u.id===messagesState.userIdForMessaging)[0].userName}</h3>
            <Prescription>Last Activity: {messagesState.dialogs.
            filter(u=>u.id===messagesState.userIdForMessaging)[0].lastUserActivityDate.slice(0,10)+" "+messagesState.dialogs.
            filter(u=>u.id===messagesState.userIdForMessaging)[0].lastUserActivityDate.slice(11,19)}</Prescription>
        </InfoWrapper>
    </TitleMessaging> }
        <MessagesList>
            {messagesState.messagesWithUser.map(m => <Message key={m.id} message={m} photo={messagesState.dialogs.
            filter(u=>u.id===messagesState.userIdForMessaging)[0].photos.small}/>)}
            <TextAreaWrapper>
                <TextArea
                    value={messagesState.newMessageText}
                    onChange={onChangeTextareaHandler}
                    placeholder="Type your message..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    id={"messageInput"}
                    size={"large"}
                />
                <Button type="primary" size={'large'} onClick={SendMessageHandler}>
                    Send
                </Button>
            </TextAreaWrapper>

        </MessagesList>

        </>
    );
};

const UserPhoto = styled.img`
height: 70px;
  width: 70px;
  border-radius: 5px;
`
const MessagesTitle = styled.h2`
  padding: 10px;
  color: aqua;
  text-align: center;
`
const TitleMessaging = styled.div`
  justify-content: center;
  align-items: center;
    display: flex;
  padding: 20px;
  gap:40px
`
const InfoWrapper = styled.div`
display: flex;
  flex-direction: column;
  gap:10px;

`
const Prescription = styled.h4`
opacity: 0.5;
  font-weight: 400;
`
const MessagesList = styled.ul`
  background-color: lightcyan;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  align-items: start;
`
const TextAreaWrapper = styled.div`
  width: 100%;
display: flex;
  margin-top: 100px;
align-items: center;
  gap: 20px;
  & > textarea {
    width: 80%;
  }
  & > button {
    align-self: end;
    width: 20%;
   }
`