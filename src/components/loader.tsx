import React from "react";
import styled, { keyframes } from "styled-components";
import { Box } from "rebass";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderDiv = styled(Box)`
  border: 16px solid #e0e0de;
  border-top: 16px solid #5B4E77;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: absolute;
  top: 50%;
`;

const Loader = () => (
  <LoaderDiv width={'75px'} height={'75px'} />
);

export default Loader;