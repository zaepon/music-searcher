import React from 'react';
import styled from 'styled-components';


const StyledFrame  = styled.iframe`
    width: 100%;
    height: 100%;
    min-height: 500px;
`


interface PlayerProps {
    src: string;
}

const Player = (props: PlayerProps) => {

    return (
        <>
        <StyledFrame src={props.src}  frameBorder="0" allow={'encrypted-media'}/>
        </>
    )
}

export default Player;