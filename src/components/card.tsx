import React from "react";
import styled, { keyframes } from "styled-components";
import { Box, Flex, Image } from "rebass";
import Header from "./header";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Menu = styled(Box)`
  position: absolute;
  transition: height 0.5s ease-in-out;
  width: 100%;
  height: 0;
  top: 0;
`;

const ButtonContainer = styled(Flex)`
  overflow: hidden;
  height: 0;
  top: 50%;
  left: 50%;
`;

const CardContainer = styled(Box)`
  background-color: #445b6f;
  width: 360px;
  min-width: 200px;
  min-height: 250px;
  text-align: initial;
  border: 2px solid #090f17;
  border-radius: 6px;
  cursor: pointer;
  color: #cae5ff;
  animation: ${fadeIn} 2s linear;
  position: relative;
  box-shadow: 0 .25rem .25rem rgba(0,0,0,0.2),
    0 0 1rem rgba(0,0,0,0.2);

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: .25s ease-in-out;
  &:hover {
    transform: scale(1.05);
    transition: .25s ease-in-out;
  }

  &:hover ${Menu} {
    height: 100%;
  }
  &:hover ${ButtonContainer} {
    height: 100%;
  }
`;

const StyledHeader = styled(Header)`
  color: #d8e2dc;
  margin: 0.75em;
`;

const StyledImg = styled(Image)`
  min-height: 231px;
`;

const Description = styled.p`
  margin: 1em;
  font-size: 0.85em;
`;

const MenuButton = styled.button`
  padding: 1em;
  background-color: #3d597f;
  border: 2px solid #3d597f;
  cursor: pointer;
  color: white;
  font-weight: 700;

  &:last-child {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  &:hover {
    background-color: #fff;
    color: #3d597f;
    transition: 0.5s;
  }
  &:active {
    background-color: #3d597f;
    color: #fff;
  }
  &:focus {
    outline: none;
  }
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

export interface CardProps {
  onClick?: () => void;
  title?: string;
  text?: string;
  img?: string;
  fillrate?: number;
  menuItems?: MenuItem[];
  className?: string;
}

interface MenuItem {
  action: () => void;
  label: string;
}

const Card = (props: CardProps) => {
  return (
    <>
      <CardContainer className={props.className} mr={"1.5em"} mt={"3em"}>
        <StyledImg src={props.img} sx={{ width: ["100%"], borderRadius: 5 }} />
        <StyledHeader title={props.title} type={"h3"} />
        <Description>{props.text}</Description>
        {props.menuItems && (
          <Menu>
            <ButtonContainer flexDirection={"column"}>
              {props.menuItems.map((menuItem, index) => {
                return (
                  <MenuButton key={index} onClick={menuItem.action}>
                    {menuItem.label}
                  </MenuButton>
                );
              })}
            </ButtonContainer>
          </Menu>
        )}
      </CardContainer>
    </>
  );
};

export default Card;
