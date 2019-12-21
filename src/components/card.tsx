import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "./header";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Menu = styled.div`
  position: absolute;
  transition: height .5s ease-in-out;
  width: 100%;
  height: 0;
  top: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 0;
  top: 50%;
  left: 50%;
`

const CardContainer = styled.div`
  background-color: #445b6f;
  margin-top: 1em;
  width: 250px;
  min-width: 200px;
  min-height: 250px;
  text-align: center;
  border: 2px solid #090f17;
  border-radius: 5px;
  cursor: pointer;
  color: #cae5ff;
  margin-right: 2em;
  animation: ${fadeIn} 2s linear;
  position: relative;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover ${Menu}{
    height: 100%;
  }
  &:hover ${ButtonContainer}{
    height: 100%;
  }
`;

const StyledHeader = styled(Header)`
  color: #d8e2dc;
`;

const StyledImg = styled.img`
  width: 100%;
  min-height: 231px;
`;

const Description = styled.p`
  margin: 1em;
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
}

interface MenuItem {
  action: () => void;
  label: string;
}

const Card = (props: CardProps) => {

  return (
    <>
      <CardContainer>
        <StyledImg src={props.img} />
        <StyledHeader title={props.title} type={"h2"} />
        <Description>{props.text}</Description>
        {props.menuItems && (
          <Menu>
            <ButtonContainer>
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
