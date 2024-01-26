import React, {useEffect, useState} from "react";
import {MessageType} from "../../api/api-dialogs";
import styled, {css} from "styled-components";
import unknown from "../../assets/images/UnknowIcon.svg";
import {Button} from "antd";
import {DeleteOutlined, ReloadOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {deleteMessageTC, isMessageViewedTC} from "../../redux/messages-reducer";

export const Message: React.FC<{ message: MessageType, photo: string }> = ({message, photo}) => {

    const [authUserId, setAuthUserId] = useState(0)
const dispatch = useDispatch()
    useEffect(() => {
        fetch("https://social-network.samuraijs.com/api/1.1/auth/me", {credentials: "include"}).then(res => res.json()).then(res => setAuthUserId(res.data.id))
    }, [])
const deleteMessageHandler = () => {
        dispatch(deleteMessageTC(message.id))
}
const checkMessageIsViewedHandler = () => {
    dispatch(isMessageViewedTC(message.id))
}



    return (
        <MessageItem isSend={authUserId === message.senderId} >
            <PhotoWrapper>
                <SenderPhoto src={authUserId === message.senderId ? unknown : photo ? photo : unknown}
                             alt={"sender photo here"}></SenderPhoto>
                <small>{message.addedAt.slice(0, 10)}</small>
                <small> {message.addedAt.slice(11, 19)}</small>
            </PhotoWrapper>

            <TextWrapper>
                <Name>{message.senderName}</Name>
                <MessageText> {message.body}</MessageText>
                <ButtonWrapper>
                <Button onClick={deleteMessageHandler} shape="circle" size={"small"} icon={<DeleteOutlined rev={undefined} />} />
                <small>{authUserId === message.senderId && message.viewed && "viewed"} </small>
                <small>{authUserId === message.senderId && !message.viewed && <><Button shape="circle" size={"small"} icon={<ReloadOutlined rev={undefined} onClick={checkMessageIsViewedHandler}/>} /></>}</small>
                </ButtonWrapper>
            </TextWrapper>
        </MessageItem>
    );
};

const MessageItem = styled.li<{ isSend: boolean}>`
  max-width: 70%;
  background-color: lightskyblue;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;

  ${props => props.isSend && css<{ isSend: boolean}>`
    align-self: end;
    flex-direction: row-reverse;
    h3 {
      align-self: end;
    }
    ${ButtonWrapper} {
      align-self: start;
    }
  `}
  small {
    opacity: 80%;
  }
  
`
const SenderPhoto = styled.img`
  height: 50px;
  width: 50px;
  align-self: center;
  border-radius: 50%;
  margin: 0 10px;
`
const Name = styled.h3`
  padding-bottom: 10px;
  align-self: start;
`
const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`
const MessageText = styled.p`
align-self: flex-end ;
`
const TextWrapper = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: end;
  button {
    opacity: 60%;
  }
`
const ButtonWrapper = styled.div`
display: flex;
  padding: 5px;
  gap: 3px;
`