import React from "react";
import styled from "styled-components";

export interface MatchBarProps {
  fillRate?: number;
  className?: string;
}

const BarContainer = styled.div`
  width: 100%;
  background-color: #ddd;
`;

const FillBar = styled.div`
  background-color: #f4acb7;
  height: 15px;
`;

const MatchBar = (props: MatchBarProps) => (
  <BarContainer className={props.className}>
    <FillBar style={{ width: `${props.fillRate}%` }} />
  </BarContainer>
);

export default MatchBar;
