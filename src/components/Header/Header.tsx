import React from "react";
import logo from "../../assets/images/MainLogo.svg";
import styled from "styled-components";

export const Header = () => {

    return (
        <StyledHeader>
            <HeaderWrapper>
                <Logo src={logo} alt={"Logo is here"}/>
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
`

const HeaderWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`