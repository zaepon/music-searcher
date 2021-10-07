import React from "react";
import styled, { keyframes } from "styled-components";
import { Box, Flex, Image } from "rebass";
import Header from "./header";
import Tag from "./tag";

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
  height: 100%;
  top: 50%;
  left: 50%;
`;

const CardContainer = styled(Box)`
  background-color: ${(props) => props.theme.colors.star};
  width: 360px;
  min-width: 200px;
  min-height: 250px;
  text-align: initial;
  border-radius: 6px;
  cursor: pointer;
  color: #cae5ff;
  animation: ${fadeIn} 2s linear;
  position: relative;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2), 0 0 1rem rgba(0, 0, 0, 0.2);

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: 0.25s ease-in-out;
  &:hover {
    transform: scale(1.05);
    transition: 0.1s ease-in-out;
  }
`;

const TagContainer = styled.ul`
  list-style: none;
  margin 0;
  overflow: none;
  padding: 0;
`;

const StyledHeader = styled(Header)`
  color: ${(props) => props.theme.colors.stark2};
  margin: 0.75em;
`;

const StyledImg = styled(Image)`
  && {
    object-fit: cover;
    min-height: 300px;
    height: 15vw;
    border-radius: 5px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom: 0.25em solid #ee6f87;
    box-shadow: 0 0.1rem 0.1rem -1px #ee6f87;
  }
  &: hover {
    opacity: 0.6;
  }
`;

const Description = styled.p`
  margin: 1em;
  font-size: 0.85em;
`;

const MenuButton = styled.button`
  padding: 1em;
  margin-top: 0;
  background-color: ${(props) => props.theme.colors.color2};
  cursor: pointer;
  color: ${(props) => props.theme.colors.stark};
  font-weight: 700;
  border: none
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;

  &:hover {
    background-color: ${(props) => props.theme.colors.stark};
    color: #3d597f;
    transition: 0.15s;
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
  tags?: string[];
  img?: string;
  imgAction?: () => void;
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
      <CardContainer className={props.className} p={"1em"} mt={"3em"} sx={{marginRight: ["0em", "2em"]}}>
        <StyledImg
          src={props.img}
          sx={{ width: ["100%"] }}
          onClick={props.imgAction}
        />
        <Flex justifyContent="space-between">
          <StyledHeader title={props.title} type={"h3"} />
          <ButtonContainer flexDirection={"row"}>
            {props.menuItems?.map((menuItem, index) => {
              return (
                <MenuButton key={index} onClick={menuItem.action}>
                  {menuItem.label}
                </MenuButton>
              );
            })}
          </ButtonContainer>
        </Flex>
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
        <TagContainer>
          {props.tags?.map((t, k) => {
            return <Tag key={k} text={t} />;
          })}
        </TagContainer>
      </CardContainer>
    </>
  );
};

export default Card;
