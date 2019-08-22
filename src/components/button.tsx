import styled from 'styled-components';

const Button = styled.button`
  width: 100px;
  height: 35px;
  background-color: #564787;
  border: 2px solid #564787;
  border-radius: 25px;
  cursor: pointer;
  color: white;
  font-weight: 700;
  &:hover {
    background-color: #fff;
    color: #564787;
    border: 1px solid #564787;
    transition: 0.5s;
  }
  &:active {
    background-color: #564787;
    border: 1px solid #564787;
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
`

Button.displayName = "Button";

export default Button;