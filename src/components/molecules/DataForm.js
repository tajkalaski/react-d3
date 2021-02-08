import React from "react";
import Heading from "./../atoms/Heading";
import Button from "./../atoms/Button";
import DataInput from "./../atoms/DataInput";
import ColorList from "./../molecules/ColorList";
import Label from "./../atoms/Label";
import styled, { css } from "styled-components";

const StyledInputWrapper = styled.div`
  ${({ wide }) =>
    wide &&
    css`
      width: 75%;
    `}
`;

const StyledFormWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledInput = styled(DataInput)`
  width: 100%;
`;

const DataForm = ({ color, setColor, handleValueChange, index }) => (
  <StyledFormWrapper>
    <StyledInputWrapper wide>
      <Label>Values</Label>
      <StyledInput
        placeholder="ex. 1, 2, 3, 4"
        type="text"
        name="data"
        onChange={(e) => handleValueChange(e, index)}
      ></StyledInput>
    </StyledInputWrapper>
    <StyledInputWrapper>
      <Label>Chart Color</Label>
      <ColorList color={color} setColor={setColor} />
    </StyledInputWrapper>
  </StyledFormWrapper>
);

export default DataForm;
