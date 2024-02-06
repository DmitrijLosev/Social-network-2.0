import React from "react";
import {Button} from "antd";
import styled from "styled-components";
import unknown from "../../../assets/images/UnknowIcon.svg"
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../redux/hooks";

export const AuthInfo = () => {

    const {
        isAuth,
        ownerProfile,
        ownerLogin,
        ownerEmail
    } = useAppSelector(state => state.authPage)


    return (
        isAuth ?
            <FlexWrapper>
                <OwnerPhoto src={ownerProfile?.photos.small ? ownerProfile?.photos.small : unknown}
                            alt="owner photo here"/>
                <OwnerInfoWrapper>
                    <span>{ownerProfile?.fullName ? ownerProfile?.fullName :""}</span>
                    <span>login: {ownerLogin ? ownerLogin : ""}</span>
                    <span>e-mail: {ownerEmail ? ownerEmail : ""}</span>
                </OwnerInfoWrapper>
            </FlexWrapper> : <Button type='primary'><NavLink to={"/login"}>Login</NavLink></Button>
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