import React from "react";
import styled from "styled-components";

export const Navbar = () => {
    return (
        <StyledAside>
            <StyledNav>
                <NavLinkList>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Messages</a></li>
                    <li><a href="#">Users</a></li>
                    <li><a href="#">Music</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">News</a></li>
                </NavLinkList>
            </StyledNav>
        </StyledAside>
    );
};

const StyledAside = styled.aside`
  grid-area: a;
  background-color: blueviolet;
 
  
  
`
const StyledNav=styled.nav`
  
`

const NavLinkList=styled.ul`
  list-style-type: none;
  margin:0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:5px;
  padding-top:20px;
  font-size: 20px;
`