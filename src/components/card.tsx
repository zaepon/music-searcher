import React, { useState } from "react";
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
`;

const StyledHeader = styled(Header)`
  color: #d8e2dc;
`;

const StyledImg = styled.img`
  width: 100%;
  min-height: 231px;

  &:hover {
    opacity: 0.75;
  }
`;

const Description = styled.p`
  margin: 1em;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  animation: ${fadeIn} 0.25s linear;
`;

const MenuButton = styled.button`
  padding: 1em;
  background-color: #564787;
  border: 2px solid #564787;
  cursor: pointer;
  color: white;
  font-weight: 700;

  &:last-child {
    border-bottom-left-radius: 20px;
  }
  &:hover {
    background-color: #fff;
    color: #564787;
    border: 1px solid #564787;
    transition: 0.5s;
  }
  &:active {
    background-color: #564787;
    border: 1px solid #564787;
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
  const [showMenu, toggleShowMenu] = useState(false);

  return (
    <>
      <CardContainer onClick={() => toggleShowMenu(showMenu ? false : true)}>
        <StyledImg src={props.img} />
        <StyledHeader title={props.title} type={"h2"} />
        <Description>{props.text}</Description>
        {showMenu && props.menuItems && (
          <Menu>
            {props.menuItems.map((menuItem, index) => {
              return (
                <MenuButton key={index} onClick={menuItem.action}>
                  {menuItem.label}
                </MenuButton>
              );
            })}
          </Menu>
        )}
      </CardContainer>
    </>
  );
};

export default Card;
