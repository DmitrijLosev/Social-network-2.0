import React from "react";
import {Flex, Spin} from "antd";
import styled from "styled-components";

export const Preloader = () => {
    return (
        <Flex align="center" gap="middle" vertical color={"primary"} style={{position:"absolute",top:"-30px"}}>
            <Spin size="large" />
            <TextSpan>Loading</TextSpan>
        </Flex>
    );
};



const TextSpan = styled.span`
color:#1677ff;
  font-size: 14px;
`