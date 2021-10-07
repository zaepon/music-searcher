import React from "react";
import { Image, Flex } from "rebass";
import Header from "./header";
import styled from "styled-components";
import SpotifyLogo from "./spotify-logo.svg";

const StyledA = styled.a`
  text-decoration: none;
`;

interface LoginIndicatorProps {
  url: string;
}
const LoginIndicator = (props: LoginIndicatorProps) => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" marginRight={"1"} marginLeft={"1"} style={{textAlign: "center"}}>
      <StyledA href={props.url}>
      <Image  sx={{
    width: [ '50%', '50%' ],
    borderRadius: 8,
  }} src={SpotifyLogo} alt="spotify-logo" />
        <Header type={"h3"} title="Login to spotify to get personalized music recommendations" />
      </StyledA>
    </Flex>
  );
};
export default LoginIndicator;
