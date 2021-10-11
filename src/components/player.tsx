import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledFrame = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 500px;
  animation: ${fadeIn} 1s linear;
`;

interface PlayerProps {
  src: string;
}

const Player = (props: PlayerProps) => {
  return (
    <>
      <StyledFrame src={props.src} frameBorder="0" allow={"encrypted-media"} />
    </>
  );
};

export default Player;
