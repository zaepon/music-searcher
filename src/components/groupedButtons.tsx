import React from "react";
import styled from "styled-components";
import { Flex } from "rebass";

import Button from "./button";

const TextButton = styled(Button)`
  border: none;
  margin-right: 2em;
  margin-top: 2em;
`;

interface GroupedButtonsProps {
  propertyKey: string;
  data: Array<Object>;
  actions: Array<ActionObject>;
}

interface ActionObject {
  keyValue: string;
  onClick: () => void;
}

const getKeyValues = (arr: Array<Object>, propKey: string) => {
  const reducer = (newArr: string[], curr: any) => {
    const check = newArr.includes(curr[propKey])
      ? "null"
      : newArr.push(curr[propKey]);
    return newArr;
  };
  return arr.reduce<string[]>(reducer, []);
};

const sortActionsToKeyValues = (
  keyValues: Array<string>,
  actions: Array<ActionObject>
) => {
  let rdc = (newArr: Array<ActionObject>, curr: ActionObject) => {
    if (keyValues.includes(curr.keyValue)) newArr.push(curr);
    return newArr;
  };
  return actions.reduce(rdc, []);
};

const GroupedButtons = (props: GroupedButtonsProps) => {
  sortActionsToKeyValues(
    getKeyValues(props.data, props.propertyKey),
    props.actions
  );
  return (
    <>
      <Flex flexWrap={"wrap"}>
        {sortActionsToKeyValues(
          getKeyValues(props.data, props.propertyKey),
          props.actions
        ).map((b, i) => (
          <TextButton onClick={b.onClick} key={i}>{b.keyValue}</TextButton>
        ))}
      </Flex>
    </>
  );
};

export default GroupedButtons;
