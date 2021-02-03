import React from "react";

const ColorList = () => (
  <ul class="colors">
    <ColorListItem
      color="blue"
      icon={checkedIcon}
      onClick={(e) => handleColorChange(e, "blue")}
      className={color === theme.blue.normal ? "active" : ""}
    ></ColorListItem>
    <ColorListItem
      color="orange"
      icon={checkedIcon}
      onClick={(e) => handleColorChange(e, "orange")}
      className={color === theme.orange.normal ? "active" : ""}
    ></ColorListItem>
    <ColorListItem
      color="red"
      icon={checkedIcon}
      onClick={(e) => handleColorChange(e, "red")}
      className={color === theme.red.normal ? "active" : ""}
    ></ColorListItem>
    <ColorListItem
      color="green"
      icon={checkedIcon}
      onClick={(e) => handleColorChange(e, "green")}
      className={color === theme.green.normal ? "active" : ""}
    ></ColorListItem>
    <ColorListItem
      color="grey"
      icon={checkedIcon}
      onClick={(e) => handleColorChange(e, "grey")}
      className={color === theme.grey.normal ? "active" : ""}
    ></ColorListItem>
  </ul>
);
