import React from "react";

export interface HeaderProps {
  type?: string;
  title?: string;
  color?: string;
  className?: string
}

const Header = (props: HeaderProps) => {
  if (props.type === "h2")
    return <h2 className={props.className} style={{ color: `${props.color}` }}>{props.title}</h2>;
  else if (props.type === "h3")
    return <h3 className={props.className} style={{ color: `${props.color}` }}>{props.title}</h3>;
  else if (props.type === "h4")
    return <h4 className={props.className} style={{ color: `${props.color}` }}>{props.title}</h4>;
  else return <h1 className={props.className} style={{ color: `${props.color}` }}>{props.title}</h1>;
};
export default Header;
