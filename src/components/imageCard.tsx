import React from "react";
import styled from "styled-components";

import playButton from './play-button.svg';

const StyledIcon = styled.div`
  width: 50px;
  opacity: 0;
  position: absolute;
  width: 50%;
  height: 50%;
  top: 25%;
  left: 25%;
  transition: .5s;
  cursor: pointer;
  
`;

const StyledImg = styled.img`
  width: 250px;
  min-height: 231px;
`;

const ImgContainer = styled.div`
  margin-top: 1em;
  margin-right: 2em;
  position: relative;

  &:hover {
    opacity: 0.8;
  }
  &:hover ${StyledIcon} {
    opacity: 1;
    background-image: url(${playButton});
    background-repeat: no-repeat;
  }
`

interface ImageCardProps {
  img: string;
  onClick: () => void;
}


const ImageCard = (props: ImageCardProps) => {
  return (
    <ImgContainer>
      <StyledImg src={props.img} />
      <StyledIcon onClick={props.onClick}></StyledIcon>
    </ImgContainer>
  )
}

export default ImageCard;