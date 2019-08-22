import React from "react";

export interface HeaderProps {
  type?: string;
  title?: string;
}

const Header = (props: HeaderProps) => {
  if (props.type === "h2") return <h2>{props.title}</h2>;
  else if (props.type === "h3") return <h3>{props.title}</h3>;
  else if (props.type === "h4") return <h4>{props.title}</h4>;
  else return <h1>{props.title}</h1>;
};
export default Header;
