import React, {useEffect} from "react";
import logo from "../../assets/images/MainLogo.svg";
import styled, {css} from "styled-components";
import {setNewMessagesCountTC} from "../../redux/messages-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {NavLink} from "react-router-dom";

export const Header = () => {

    const dispatch = useDispatch()
    const newMessagesCount = useSelector<RootStateType, number>(state => state.messagesPage.newMessagesCount)
    useEffect(() => {
        dispatch(setNewMessagesCountTC())
        let intervalId = setInterval(() => {
            dispatch(setNewMessagesCountTC())
        }, 30000)
        return () => {
            clearTimeout(intervalId)
        }
    }, [])


    return (
        <StyledHeader>
            <HeaderWrapper>
                <Logo src={logo} alt={"Logo is here"}/>
                <NavLink to={"/messages"}>
                    <TextCountMessage>New messages:  <MessageCount isMessages={newMessagesCount > 0}>{newMessagesCount}
                        </MessageCount>
                    </TextCountMessage>
                    </NavLink>
            </HeaderWrapper>
        </StyledHeader>
    );
};

const Logo = styled.img`
  width: 80px;
  height: 80px;
  color: transparent;
`
const StyledHeader = styled.header`
  background-color: lightskyblue;
  position: fixed;
  width: 100%;
  height: 100px;
  grid-area: h;
  z-index: 100000000000;
`

const HeaderWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`
const TextCountMessage = styled.h4`
  padding-left: 50px;
  color: darkblue;
`
const MessageCount = styled.span<{ isMessages: boolean }>`
  font-size: 20px;
  ${props => props.isMessages && css<{ isMessages: boolean }>`
    color: crimson;
  `}
`