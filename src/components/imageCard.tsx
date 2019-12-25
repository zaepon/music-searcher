import React from "react";
import styled, { keyframes } from "styled-components";
import { Box, Image } from "rebass"; 

import playButton from './play-button.svg';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledIcon = styled(Box)`
  opacity: 0;
  position: absolute;
  width: 50%;
  height: 50%;
  top: 25%;
  left: 25%;
  transition: .5s;
  cursor: pointer;  
`;

const StyledImg = styled(Image)`
  min-height: 231px;
`;

const ImgContainer = styled(Box)`
  position: relative;
  animation: ${fadeIn} 1s linear;
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
    <ImgContainer mt={'1em'} mr={'2em'} >
      <StyledImg sx={{width:['250px'], borderRadius:10}} src={props.img} />
      <StyledIcon onClick={props.onClick}></StyledIcon>
    </ImgContainer>
  )
}

export default ImageCard;