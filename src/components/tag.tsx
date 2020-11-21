import React from "react";
import styled from "styled-components";

const TagLi = styled.li`
background: ${props => props.theme.colors.color2};
color: ${props => props.theme.colors.stark};
height: 15px;
display: inline-block;
border-radius: 10%;
line-height: 15px;
padding: 5px 5px 5px 5px;
margin: 0 5px 5px 1em;
text-decoration: none;
position: relative;
font-size: 0.80em;

`;

interface TagProps {
  text: string;
}

const Tag = (props: TagProps) => {
  return (
    <>
      <TagLi>{props.text}</TagLi>
    </>
  );
};

export default Tag;
