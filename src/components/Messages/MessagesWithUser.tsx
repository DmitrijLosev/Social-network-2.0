import React, {ChangeEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    actions,
    filterMessagesTC,
    MessagesPageStateType,
    sendMessageTC,
    setMessagesWithUserTC
} from "../../redux/messages-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {Message} from "./Message";
import styled from "styled-components";
import unknown from "../../assets/images/UnknowIcon.svg";
import {Button, DatePicker, DatePickerProps, Input} from "antd";

const { TextArea } = Input;


export const MessagesWithUser = () => {

    const [filterDate, setFilterDate] = useState<string>("")

    const dispatch = useDispatch()
    const {dialogs,userIdForMessaging,messagesWithUser,newMessageText}=useSelector<RootStateType,MessagesPageStateType>(state=>state.messagesPage)
    const {id} = useParams<{ id: "string" }>();

    useEffect(() => {
dispatch(setMessagesWithUserTC(+id))
    }, [userIdForMessaging])


    const onChangeTextareaHandler=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        dispatch(actions.setNewMessageText(e.currentTarget.value))
    }
    const SendMessageHandler=()=>{dispatch(sendMessageTC())}

    const messageFilterChangeHandler: DatePickerProps['onChange'] = (date,dateString) => {
        if(new Date(dateString).getTime() < new Date().getTime()){
            setFilterDate(dateString);
        }
    };
    const filterMessageHandler= ()=>{
        if (userIdForMessaging && filterDate) {
            dispatch(filterMessagesTC(userIdForMessaging,filterDate))
        }
    }
const filterAllMessageHandler = ()=> {
        if(userIdForMessaging) {
            dispatch(setMessagesWithUserTC(userIdForMessaging))
        }
}
    return (<>
            <MessagesTitle>Messaging with :</MessagesTitle>
    {messagesWithUser.length > 0 ?
        <TitleMessaging>
        <UserPhoto src = {dialogs.
        filter(u=>u.id===userIdForMessaging)[0].photos.small ? dialogs.
        filter(u=>u.id===userIdForMessaging)[0].photos.small  : unknown} alt={"user photo here"}/>
        <InfoWrapper>
            <h3>{dialogs.filter(u=>u.id===userIdForMessaging)[0].userName}</h3>
            <Prescription>Last Activity: {dialogs.
            filter(u=>u.id===userIdForMessaging)[0].lastUserActivityDate.slice(0,10)+" "+dialogs.
            filter(u=>u.id===userIdForMessaging)[0].lastUserActivityDate.slice(11,19)}</Prescription>
        </InfoWrapper>
            <Filter>
                <DatePicker onChange={messageFilterChangeHandler} />
                <Button type="primary" onClick={filterMessageHandler}>
                   Filter
                </Button>
                <Button type="primary" onClick={filterAllMessageHandler}>
                    All
                </Button>
            </Filter>
    </TitleMessaging> :
        <TitleMessaging>
            <UserPhoto src = {unknown} alt={"user photo here"}/>
            <InfoWrapper>
                <h3>Unknown with id {id} </h3>
            </InfoWrapper>
        </TitleMessaging>}
        <MessagesList>
            {messagesWithUser.length>0 && messagesWithUser.map(m => <Message key={m.id} message={m} photo={dialogs.
            filter(u=>u.id===userIdForMessaging)[0].photos.small}/>)}
            <TextAreaWrapper>
                <TextArea
                    value={newMessageText}
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
const Filter = styled.div`
display: flex;
  gap: 5px;
`