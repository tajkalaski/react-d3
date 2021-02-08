import React from "react";
import styled from "styled-components";
import { theme } from "./../../theme/theme";
import checkedIcon from "./../../assets/tick.svg";
import ColorListItem from "./../atoms/ColorListItem";

const StyledList = styled.ul`
  margin: 0px;
  padding: 0px;
  display: flex;
`;

const ColorList = ({ color, setColor, itemNr }) => {
  console.log(color[itemNr]);
  console.log(itemNr);
  return (
    <StyledList>
      <ColorListItem
        color="blue"
        icon={checkedIcon}
        onClick={() => setColor(theme.blue.normal, itemNr)}
        className={color[itemNr] === theme.blue.normal ? "active" : ""}
      ></ColorListItem>
      <ColorListItem
        color="orange"
        icon={checkedIcon}
        onClick={() => setColor(theme.orange.normal, itemNr)}
        className={color[itemNr] === theme.orange.normal ? "active" : ""}
      ></ColorListItem>
      <ColorListItem
        color="red"
        icon={checkedIcon}
        onClick={() => setColor(theme.red.normal, itemNr)}
        className={color[itemNr] === theme.red.normal ? "active" : ""}
      ></ColorListItem>
      <ColorListItem
        color="green"
        icon={checkedIcon}
        onClick={() => setColor(theme.green.normal, itemNr)}
        className={color[itemNr] === theme.green.normal ? "active" : ""}
      ></ColorListItem>
      <ColorListItem
        color="grey"
        icon={checkedIcon}
        onClick={() => setColor(theme.grey.normal, itemNr)}
        className={color[itemNr] === theme.grey.normal ? "active" : ""}
      ></ColorListItem>
    </StyledList>
  );
};

export default ColorList;
