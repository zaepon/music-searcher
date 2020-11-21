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
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Image  sx={{
    width: [ '100%', '50%' ],
    marginTop: ['40%', "5%"],
    borderRadius: 8,
  }} src={SpotifyLogo} alt="spotify-logo" />
      <Header type={"h1"} title="Want to get more out of Music searcher?" />
      <StyledA href={props.url}>
        <Header type={"h2"} title="Click here to Login via Spotify" />
      </StyledA>
    </Flex>
  );
};
export default LoginIndicator;
