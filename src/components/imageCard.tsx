import React from "react";
import styled, { keyframes } from "styled-components";
import { Box } from "rebass";

import playButton from "./play-button.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  transition: 0.5s;
  cursor: pointer;
`;

const ImgContainer = styled(Box)`
  position: relative;
  animation: ${fadeIn} 1s linear;
  transition: 0.25s ease-in-out;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
    transition: 0.25s ease-in-out;
  }

  &:hover ${StyledIcon} {
    opacity: 1;
    background-image: url(${playButton});
    background-repeat: no-repeat;
  }
`;

interface ImageCardProps {
  img: string;
  onClick: () => void;
}

const ImageCard = (props: ImageCardProps) => {
  return (
    <ImgContainer mt={"1em"} mr={"2em"}>
      <LazyLoadImage
        width="250px"
        style={{ borderRadius: 10 }}
        src={props.img}
        effect="blur"
      />
      <StyledIcon onClick={props.onClick}></StyledIcon>
    </ImgContainer>
  );
};

export default ImageCard;
