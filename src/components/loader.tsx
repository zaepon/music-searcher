import React from "react";
import styled, { keyframes } from "styled-components";
import { Box } from "rebass";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderDiv = styled(Box)`
  border: 12px solid rgb(36,37,47);
  border-top: 12px solid #EE6F87;
  border-radius: 50%;
  animation: ${spin} .7s linear infinite;
  top: 50%;
`;

const Loader = () => (
  <LoaderDiv width={'75px'} height={'75px'} />
);

export default Loader;