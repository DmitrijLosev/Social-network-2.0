import React, {ChangeEvent, Dispatch} from "react";
import styled from "styled-components";
import {DialogUsersItem} from "./DialogUser/DialogUser";
import {MessageItem} from "./Message/Message";
import {StyledBtn, StyledTextarea} from "../Profile/MyPosts/MyPosts";
import {
    addDialogMessageAC,
    changeDialogMessageAC,
    DialogActionsType,
    DialogsPageStateType
} from "../../redux/dialog-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/redux-store";




export const Dialogs: React.FC = () => {

    const DialogPageState=useSelector<RootStateType,DialogsPageStateType>(state=>state.dialogsPage)
    const dispatch=useDispatch<Dispatch<DialogActionsType>>()
    const sendMessage = () => {
        dispatch(addDialogMessageAC())
    }

    const onChangeMessageHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(changeDialogMessageAC(e.currentTarget.value))
    }


    return (<StyledWrapper>
            <DialogUsersWrapper>
                <ul>
                    {DialogPageState.dialogUsers.map(i => <DialogUsersItem id={i.id} name={i.name} key={i.id}/>)}
                </ul>
            </DialogUsersWrapper>
            <DialogWrapper>
                <ul>
                    {DialogPageState.messages.map(m => <MessageItem message={m.message} key={m.id}/>)}
                </ul>
            </DialogWrapper>

            <NewMessageWrapper>
                <StyledTextarea onChange={onChangeMessageHandler}
                                value={DialogPageState.typingDialogMessage}
                                placeholder="Enter your message">

                </StyledTextarea>
                <StyledBtn onClick={sendMessage}>
                    Send
                </StyledBtn>
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