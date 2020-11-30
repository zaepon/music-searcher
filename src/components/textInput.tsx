import React from "react";
import styled from "styled-components";

const StyledTextInput = styled.input`
  max-width: 500px;
  width: 100%;
  height: 3rem;
  padding-left: 1em;
  font-size: 1.5em;
  background-color: ${(props) => props.theme.colors.navy};
  border: 0;
  border-bottom: 0.15em solid ${(props) => props.theme.colors.stark};
  color: ${(props) => props.theme.colors.stark2};
  font-family: arial;
  &:focus {
    outline: none;
  }
`;

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const TextInput = (props: TextInputProps) => (
  <StyledTextInput
    value={props.value}
    onKeyDown={props.onKeyDown}
    onChange={props.onChange}
    placeholder={props.placeholder}
  />
);

export default TextInput;
