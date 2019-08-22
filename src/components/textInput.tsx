import React from "react";
import styled from "styled-components";

const StyledTextInput = styled.input`
  max-width: 500px;
  width: 100%;
  height: 2em;
  padding-left: 1em;
  font-size: 1.2em;
  border: 2px solid #564787;
  border-radius: 25px;
  color: #464b51;
  &:focus {
    outline: none;
  }
`;

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const TextInput = (props: TextInputProps) => <StyledTextInput value={props.value} onChange={props.onChange}/>;

export default TextInput;
