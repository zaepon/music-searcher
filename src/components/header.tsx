import React from "react";

export interface HeaderProps {
  type?: string;
  title?: string;
  color?: string;
}

const Header = (props: HeaderProps) => {
  if (props.type === "h2")
    return <h2 style={{ color: `${props.color}` }}>{props.title}</h2>;
  else if (props.type === "h3")
    return <h3 style={{ color: `${props.color}` }}>{props.title}</h3>;
  else if (props.type === "h4")
    return <h4 style={{ color: `${props.color}` }}>{props.title}</h4>;
  else return <h1 style={{ color: `${props.color}` }}>{props.title}</h1>;
};
export default Header;
