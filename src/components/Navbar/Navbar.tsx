import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/redux-store";

export const Navbar = () => {
    const newMessagesCount = useSelector<RootStateType,number>(state=>state.messagesPage.newMessagesCount)

    return (
        <StyledAside>
            <StyledNav>
                <NavLinkList>
                    <li><StyledNavLink to="/profile">Profile</StyledNavLink></li>
                    {newMessagesCount > 0 ? <li><StyledNavLink to="/messages">Dialogs <MessageCount>({newMessagesCount})</MessageCount></StyledNavLink></li> :
                    <li><StyledNavLink to="/messages">Dialogs</StyledNavLink></li>}
                    <li><StyledNavLink to="/dialogs">Messages</StyledNavLink></li>
                    <li><StyledNavLink to="/users">Users</StyledNavLink></li>
                    <li><StyledNavLink to="/music">Music</StyledNavLink></li>
                    <li><StyledNavLink to="/settings">Settings</StyledNavLink></li>
                    <li><StyledNavLink to="/news">News</StyledNavLink></li>
                </NavLinkList>
            </StyledNav>
        </StyledAside>
    );
};

const StyledAside = styled.aside`
  grid-area: a;
  background-color: blueviolet;
`
const StyledNav = styled.nav`

`

const NavLinkList = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-top: 20px;
  font-size: 20px;
`

const StyledNavLink = styled(NavLink)`
  &:active {
    color: lightskyblue;
  }

  &.active {
    color: lightskyblue;
    font-size: 25px;
    transition: .2s;
  }
`;

const MessageCount = styled.span`
  color: crimson;
    `