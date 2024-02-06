import React, {useEffect} from "react";
import logo from "../../assets/images/MainLogo.svg";
import styled, {css} from "styled-components";
import {setNewMessagesCountTC} from "../../redux/messages-reducer";
import {NavLink} from "react-router-dom";
import {Preloader} from "../Commons/Preloader/Preloader";
import {authApi} from "../../api/api-auth";
import {actions} from "../../redux/auth-reducer";
import {profileApi} from "../../api/api-profile";
import {AuthInfo} from "./AuthInfo/AuthInfo";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

export const Header = () => {

    const dispatch = useAppDispatch()
    const newMessagesCount = useAppSelector(state => state.messagesPage.newMessagesCount)
    const isFetching = useAppSelector(state => state.appPage.isFetching)
    const isAuth = useAppSelector(state => state.authPage.isAuth)


    useEffect(() => {

        (async () => {
            let res = await authApi.getAuth()
            if (res.resultCode === 0) {
                dispatch(actions.setIsAuth(true, res.data))
                let res2 = await profileApi.getProfile(res.data.id)
                dispatch(actions.setOwnerProfile(res2))
            } else {
                dispatch(actions.setIsAuth(false))
            }
        })()

    }, [])

    useEffect(() => {
        if(isAuth) {
            dispatch(setNewMessagesCountTC())
        }
        let intervalId = setInterval(() => {
            if(isAuth) {
                dispatch(setNewMessagesCountTC())
            }
        }, 30000)
        return () => {
            clearTimeout(intervalId)
        }
    }, [])


    return (
        <StyledHeader>
            <HeaderWrapper>
                <Logo src={logo} alt={"Logo is here"}/>
                {isAuth && <NavLink to={"/messages"}>
                    <TextCountMessage>New messages: <MessageCount isMessages={newMessagesCount > 0}>{newMessagesCount}
                    </MessageCount>
                    </TextCountMessage>
                </NavLink> }
               <PositionWrapper>
                   {isFetching && <Preloader/>}
               </PositionWrapper>
                <AuthInfo/>
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
  justify-content: space-around;
  align-items: center;
  gap: 80px;
  position:relative
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
const PositionWrapper = styled.div`
position: relative`