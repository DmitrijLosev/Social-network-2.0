import React from "react";
import {Button} from "antd";
import styled from "styled-components";
import unknown from "../../../assets/images/UnknowIcon.svg"
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {logout} from "../../../redux/auth-reducer";

export const AuthInfo = () => {
const dispatch = useAppDispatch()

    const {
        isAuth,
        ownerProfile,
        ownerLogin,
        ownerEmail
    } = useAppSelector(state => state.authPage)
const logoutHandler = () => {
        dispatch(logout())
}

    return (<>
        {isAuth &&
        <LoginWrapper>
            <FlexWrapper>
                <OwnerPhoto src={ownerProfile?.photos.small ? ownerProfile?.photos.small : unknown}
                            alt="owner photo here"/>
                <OwnerInfoWrapper>
                    <span>{ownerProfile?.fullName ? ownerProfile?.fullName :""}</span>
                    <span>login: {ownerLogin ? ownerLogin : ""}</span>
                    <span>e-mail: {ownerEmail ? ownerEmail : ""}</span>
                </OwnerInfoWrapper>
            </FlexWrapper>
    <Button type='primary' onClick={logoutHandler}>Logout</Button>
        </LoginWrapper>}
        </>
    );
};

const FlexWrapper = styled.div`
  display: flex;
  gap: 5px;
`
const OwnerPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`
const OwnerInfoWrapper = styled.div`
display: flex;
  flex-direction: column;
  & > span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
  }
  & > span {
    font-size: 14px;
  }
`
const LoginWrapper = styled.div`
display: flex;
  gap:10px
`