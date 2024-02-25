import React, {useEffect} from "react";
import logo from "../../assets/images/MainLogo.svg";
import styled from "styled-components";
import {setNewMessagesCountTC} from "../../redux/messages-reducer";
import {Preloader} from "../Commons/Preloader/Preloader";
import {authMe} from "../../redux/auth-reducer";
import {AuthInfo} from "./AuthInfo/AuthInfo";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

export const Header = () => {

    const dispatch = useAppDispatch()
    const isFetching = useAppSelector(state => state.appPage.isFetching)
    const isAuth = useAppSelector(state => state.authPage.isAuth)

useEffect(()=>{
    let intervalId = setInterval(() => {
        if(isAuth) {
            dispatch(setNewMessagesCountTC())
        }
    }, 30000)
    return () => {
        clearTimeout(intervalId)
    }
},[isAuth])

    return (
        <StyledHeader>
            <HeaderWrapper>
                <Logo src={logo} alt={"Logo is here"}/>
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
  gap: 50px;
  position:relative
`

const PositionWrapper = styled.div`
position: relative`