import React from "react";
import styled from "styled-components";

export interface HeaderProps {
  type?: string;
  title?: string;
  color?: string;
  className?: string;
  style?: object;
}

const StyledH2 = styled.h2`
  color: ${(props) => props.theme.colors.stark};
`;

const StyledH3 = styled.h3`
  color: ${(props) => props.theme.colors.stark};
`;
const StyledH4 = styled.h4`
  color: ${(props) => props.theme.colors.stark};
`;

const StyledH1 = styled.h1`
  color: ${(props) => props.theme.colors.stark};
`;
const Header = (props: HeaderProps) => {
  if (props.type === "h2")
    return <StyledH2 className={props.className}>{props.title}</StyledH2>;
  else if (props.type === "h3")
    return <StyledH3 className={props.className}>{props.title}</StyledH3>;
  else if (props.type === "h4")
    return <StyledH4 className={props.className}>{props.title}</StyledH4>;
  else return <StyledH1 className={props.className}>{props.title}</StyledH1>;
};
export default Header;
