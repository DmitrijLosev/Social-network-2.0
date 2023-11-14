import React, {LegacyRef} from "react";
import styled from "styled-components";
import {DialogUsersItem} from "./DialogUser/DialogUser";
import {MessageItem} from "./Message/Message";
import {DialogUsersType, DialogUserType, MessagesType, MessageType} from "../../App";
import {StyledBtn, StyledTextarea} from "../Profile/MyPosts/MyPosts";


type DialogsPropsType = { dialogsPage: MessagesType & DialogUsersType }

const newMessageElement: LegacyRef<HTMLTextAreaElement> = React.createRef();

const sendMessage = () => {
    if (newMessageElement.current) {
        const message: string = newMessageElement.current.value;
        alert(message)
    }
}

export const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage}) => {
    return (<StyledWrapper>
            <DialogUsersWrapper>
                <ul>
                    {dialogsPage.dialogUsers.map(i => <DialogUsersItem id={i.id} name={i.name} key={i.id}/>)}
                </ul>
            </DialogUsersWrapper>
            <DialogWrapper>
                <ul>
                    {dialogsPage.messages.map(m => <MessageItem message={m.message} key={m.id}/>)}
                </ul>
            </DialogWrapper>
            <NewMessageWrapper>
                <StyledTextarea ref={newMessageElement}></StyledTextarea>
                <StyledBtn onClick={sendMessage}>Send</StyledBtn>
            </NewMessageWrapper>
        </StyledWrapper>
    );
};


const DialogUsersWrapper = styled.div`
  width: 30%;
  grid-area: u;
  justify-self: center
`
const DialogWrapper = styled.div`
  width: 70%;
  grid-area: d;
  justify-self: center
`
const NewMessageWrapper = styled.div`
  grid-area: m;
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledWrapper = styled.div`
  display: grid;
  grid-template-areas: "u d" "m m";
  grid-template-rows: 8fr 2fr;
  grid-template-columns: 2fr 8fr;
  width: 100%;
  height: 100%;
  margin: 0 auto;

`