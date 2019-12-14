import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

const StyledBar = styled.div`
  width: 100vw;
  top:0;
  left: 0;
  right: 0;
  position:absolute;
  background-color:rgba(9, 32, 63, 0.4);
  display: flex;
  padding-bottom: 2em;
  
`

const Topbar: FunctionComponent= ({children}) => {
  return(
    <div>
    <StyledBar>{children} </StyledBar>
    </div>
  )
}
 

export default Topbar;