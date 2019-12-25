import styled from 'styled-components';

interface ToggleButtonProps   {
  isSelected?: boolean;
}

const Button = styled.button<ToggleButtonProps>`
  width: 100px;
  height: 35px;
  font-size: .8rem;
  background-color: ${props => props.disabled ? 'grey' : '#7286a3'};
  border: ${props => props.disabled ? '0px' : '2px solid #7286a3'};
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.disabled ? '#9fa1a2' : 'white'};
  text-decoration: ${props => props.isSelected ? 'underline' : 'none'}
  font-weight: 700;
  &:hover {
    background-color: #fff;
    color: #7286a3;
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