import React, {ChangeEvent, useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {
    actions,
    filterMessagesTC,
    sendMessageTC,
    setMessagesWithUserTC
} from "../../redux/messages-reducer";
import {Message} from "./Message";
import styled from "styled-components";
import unknown from "../../assets/images/UnknowIcon.svg";
import {Button, ConfigProvider, DatePicker, DatePickerProps, Input, Pagination, PaginationProps} from "antd";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";


const {TextArea} = Input;


export const MessagesWithUser = () => {

    const [filterDate, setFilterDate] = useState<string>("")

    const dispatch = useAppDispatch()
    const {
        dialogs,
        userIdForMessaging,
        messagesWithUser,
        newMessageText,
        totalMessagesCount,
        partisipantProfile
    } = useAppSelector(state => state.messagesPage)

    const {id} = useParams<{ id: "string" }>();

    useEffect(() => {
        dispatch(setMessagesWithUserTC(+id))
    }, [userIdForMessaging])


    const onChangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(actions.setNewMessageText(e.currentTarget.value))
    }
    const SendMessageHandler = () => {
        dispatch(sendMessageTC())
    }

    const messageFilterChangeHandler: DatePickerProps["onChange"] = (date, dateString) => {
        if (new Date(dateString).getTime() < new Date().getTime()) {
            setFilterDate(dateString);
        }
    };
    const filterMessageHandler = () => {
        if (userIdForMessaging && filterDate) {
            dispatch(filterMessagesTC(userIdForMessaging, filterDate))
        }
    }
    const filterAllMessageHandler = () => {
        if (userIdForMessaging) {
            dispatch(setMessagesWithUserTC(userIdForMessaging))
        }
    }
    const onPaginationChange: PaginationProps["onChange"] = (pageNumber) => {
        dispatch(actions.setMessagePageNumber(pageNumber))
        if (userIdForMessaging) {
            dispatch(setMessagesWithUserTC(userIdForMessaging))
        }
    };

    const photo = partisipantProfile && partisipantProfile.photos.small && partisipantProfile.photos.small
    return (<>
            <MessagesTitle>Messaging with :</MessagesTitle>
            <TitleMessaging>
                <NavLink to={'/profile/'+ userIdForMessaging}> <UserPhoto
                    src={partisipantProfile && partisipantProfile.photos.small ? partisipantProfile.photos.small : unknown}
                    alt={"user photo here"}/></NavLink>
                <InfoWrapper>
                    <h3>{partisipantProfile && partisipantProfile.fullName}</h3>
                    {messagesWithUser.length > 0 && dialogs.filter(u => u.id === userIdForMessaging).length>0 &&
                        <Prescription>Last
                            Activity: {dialogs.filter(u => u.id === userIdForMessaging)[0].lastUserActivityDate.slice(0, 10) + " " + dialogs.filter(u => u.id === userIdForMessaging)[0].lastUserActivityDate.slice(11, 19)}
                        </Prescription>}
                </InfoWrapper>
                <Filter>
                    <DatePicker onChange={messageFilterChangeHandler}/>
                    <Button type="primary" onClick={filterMessageHandler}>
                        Filter
                    </Button>
                    <Button type="primary" onClick={filterAllMessageHandler}>
                        All
                    </Button>
                </Filter>
            </TitleMessaging>
            <MessagesList>
                <ConfigProvider
                    theme={{
                        components: {
                            Pagination: {
                                itemActiveBg: "lightblue",
                                colorBgContainer: "lightskyblue",
                                colorBorder: "transparent",
                            },
                        },
                    }}
                >
                    <Pagination defaultCurrent={1} pageSize={10} total={totalMessagesCount}
                                onChange={onPaginationChange}/>
                </ConfigProvider>
                {messagesWithUser.length > 0 && messagesWithUser.map(m => <Message key={m.id} message={m}
                                                                                   photo={photo}/>)}
                <TextAreaWrapper>
                    <TextArea
                        value={newMessageText}
                        onChange={onChangeTextareaHandler}
                        placeholder="Type your message..."
                        autoSize={{minRows: 3, maxRows: 5}}
                        id={"messageInput"}
                        size={"large"}
                    />
                    <Button type="primary" size={"large"} onClick={SendMessageHandler}>
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
  gap: 40px
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

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

  ul {
    align-self: center;
  }
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