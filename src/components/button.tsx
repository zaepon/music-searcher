import styled from "styled-components";

interface ToggleButtonProps {
  isSelected?: boolean;
}

const Button = styled.button<ToggleButtonProps>`
  width: 100px;
  height: 35px;
  font-size: .8rem;
  background-color: transparent;
  border: ${(props) => (props.disabled ? "0px" : "none")};
  border-bottom: ${(props) => props.theme.colors.stark2};
  
  border-radius: 1px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  cursor: pointer;
  color: ${(props) => (props.disabled ? "#9fa1a2" : "white")};
  text-decoration: ${(props) => (props.isSelected ? "underline" : "none")}
  font-weight: 700;
  &:hover {
    color: #7286a3;
    border-bottom: 1px solid #564787;
    transition: 0.25s;
  }
  &:active {
    border-bottom: 1px solid #564787;
    color: #fff;
  }
  &:focus {
    outline: none;
  }
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

Button.displayName = "Button";

export default Button;
