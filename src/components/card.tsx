import React from "react";
import styled from "styled-components";
import MatchBar from "./matchBar";

const CardContainer = styled.div`
  margin-top: 1em;
  width: 250px;
  min-height: 250px;
  text-align: center;
  border: 2px solid #d7d6d6;
  cursor: pointer;
  color: #d8e2dc;
  margin-right: 2em;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StyledImg = styled.img`
  width: 100%;
`;

export interface CardProps {
  onClick: () => void;
  title: string;
  text: string;
  img: string;
}

const Card = (props: CardProps) => {
  return (
    <>
      <CardContainer onClick={props.onClick}>
        <StyledImg src={props.img} />
        <h2>{props.title}</h2>
        <p>{props.text}</p>
        <MatchBar fillRate={20} />
      </CardContainer>
    </>
  );
};

export default Card;
