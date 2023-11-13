import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const Dialogs: React.FC = (props) => {
    return (<StyledWrapper>
            <UsersWrapper>
                <ul>
                    <li><NavLink to={"/dialogs/id1"}>Dima</NavLink></li>
                    <li><NavLink to={"/dialogs/id2"}>Tanja</NavLink></li>
                    <li><NavLink to={"/dialogs/id3"}>Svetlana</NavLink></li>
                    <li><NavLink to={"/dialogs/id4"}>Dasha</NavLink></li>
                </ul>
            </UsersWrapper>
            <DialogWrapper>
                <ul>
                    <li><span>Hello!</span></li>
                    <li><span>How are you?</span></li>
                    <li><span>How's your business?</span></li>
                    <li><span>What are news?</span></li>
                </ul>
            </DialogWrapper>
        </StyledWrapper>
    );
};

const UsersWrapper = styled.div`
  width: 30%;
`
const DialogWrapper = styled.div`
  width: 70%;
`
const StyledWrapper = styled.div`
  display: flex;


`