import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface topbarProps {
  scrolled?: boolean;
}

const StyledBar = styled.div`
  width: 100%;
  top:0;
  left: 0;
  right: 0;
  position:fixed;
  z-index: 9999;
  background-color:rgba(9, 32, 63, 0.5);
  display: flex;
  padding-bottom: 3.5em;
  padding-bottom: ${(props: topbarProps) => props.scrolled ? '.25em' : '2em'}
  padding-top: ${(props: topbarProps) => props.scrolled ? '0em' : '2em'}
  transition: .5s;
  min-height: 50px;



  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(9, 32, 63, .5);
    filter: blur(10px);
    
  }
`



const Topbar: FunctionComponent<topbarProps> = ({children, scrolled}) => {
  return(
    <div>
      <StyledBar scrolled={scrolled} >{children} </StyledBar>
    </div>
  )
}
 

export default Topbar;