import React from "react";
import {MessageType} from "../../api/api-dialogs";
import styled, {css} from "styled-components";
import unknown from "../../assets/images/UnknowIcon.svg";
import {Button} from "antd";
import {DeleteOutlined, ReloadOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {deleteMessageTC, isMessageViewedTC} from "../../redux/messages-reducer";
import {RootStateType} from "../../redux/redux-store";
import {ProfileType} from "../../api/api-profile";

export const Message: React.FC<{ message: MessageType, photo: string | null }> = ({message, photo}) => {

    const dispatch = useDispatch()
    const ownerProfile = useSelector<RootStateType,ProfileType | null>(state => state.authPage.ownerProfile)

    const deleteMessageHandler = () => {
        dispatch(deleteMessageTC(message.id))
    }
    const checkMessageIsViewedHandler = () => {
        dispatch(isMessageViewedTC(message.id))
    }

    const ownerPhoto = ownerProfile && ownerProfile.photos.small ? ownerProfile.photos.small : unknown
const participantPhoto = photo ? photo : unknown
    return (
        <MessageItem isSend={ownerProfile !== null && ownerProfile.userId === message.senderId}>
            <PhotoWrapper>
                <SenderPhoto src={ownerProfile !== null && ownerProfile.userId === message.senderId ?
                    ownerPhoto : participantPhoto}
                             alt={"sender photo here"}></SenderPhoto>
                <small>{message.addedAt.slice(0, 10)}</small>
                <small> {message.addedAt.slice(11, 19)}</small>
            </PhotoWrapper>

            <TextWrapper>
                <Name>{message.senderName}</Name>
                <MessageText> {message.body}</MessageText>
                <ButtonWrapper>
                    <Button onClick={deleteMessageHandler} shape="circle" size={"small"}
                            icon={<DeleteOutlined rev={undefined}/>}/>
                    <small>{ownerProfile !== null && ownerProfile.userId === message.senderId&& message.viewed && "viewed"} </small>
                    <small>{ownerProfile !== null && ownerProfile.userId === message.senderId && !message.viewed && <><Button shape="circle"
                                                                                            size={"small"}
                                                                                            icon={<ReloadOutlined
                                                                                                rev={undefined}
                                                                                                onClick={checkMessageIsViewedHandler}/>}/></>}</small>
                </ButtonWrapper>
            </TextWrapper>
        </MessageItem>
    );
};

const MessageItem = styled.li<{ isSend: boolean }>`
  max-width: 70%;
  background-color: lightskyblue;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;

  ${props => props.isSend && css<{ isSend: boolean }>`
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
  align-self: flex-end;
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