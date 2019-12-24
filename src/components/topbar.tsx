import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';

interface topbarProps {
  scrolled?: boolean;
}

const StyledBar = styled(Flex)`
  top:0;
  left: 0;
  right: 0;
  position:fixed;
  z-index: 9999;
  background-color:rgba(9, 32, 63, 0.8);
  padding-bottom: 3.5em;
  padding-bottom: ${(props: topbarProps) => props.scrolled ? '.25em' : '2em'}
  padding-top: ${(props: topbarProps) => props.scrolled ? '0em' : '2em'}
  transition: .2s;
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
    <Box>
      <StyledBar width={'100%'} scrolled={scrolled}>{children}</StyledBar>
    </Box>
  )
}
 

export default Topbar;