import React from "react";
import styled from "styled-components";
import MatchBar from "./matchBar";
import Header from "./header";

const CardContainer = styled.div`
  margin-top: 1em;
  width: 250px;
  min-width: 200px;
  min-height: 250px;
  text-align: center;
  border: 2px solid #d7d6d6;
  border-radius: 5px;
  cursor: pointer;
  color: #564787;
  margin-right: 2em;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StyledHeader = styled(Header)`
  color: #d8e2dc;
`

const StyledImg = styled.img`
  width: 100%;
  min-height: 231px;
`;

export interface CardProps {
  onClick?: () => void;
  title?: string;
  text?: string;
  img?: string;
  fillrate?: number;
}

const Card = (props: CardProps) => {
  return (
    <>
      <CardContainer onClick={props.onClick}>
        <StyledImg src={props.img} />
        <StyledHeader title={props.title} type={'h2'}/>
        <p>{props.text}</p>
        <MatchBar fillRate={props.fillrate}/>
      </CardContainer>
    </>
  );
};

export default Card;
