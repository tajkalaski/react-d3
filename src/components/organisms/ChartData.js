import React from "react";
import Heading from "./../atoms/Heading";
import Button from "./../atoms/Button";
import DataInput from "./../atoms/DataInput";
import ColorList from "./../molecules/ColorList";
import Label from "./../atoms/Label";
import styled, { css } from "styled-components";

const StyledHeading = styled(Heading)`
  letter-spacing: -0.5px;
  border-bottom: 1px solid #eceded;
  text-align: left;
`;

const StyledWrapper = styled.div`
  width: 75%;
  min-width: 900px;
  background: white;
  margin: 16px auto;
  border-radius: 5px;
  border: 1px solid #eceded;
`;

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

const StyledForm = styled.form`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ChartData = ({ onSubmit, color, setColor }) => (
  <StyledWrapper>
    <StyledHeading>Chart Data</StyledHeading>
    <StyledForm onSubmit={onSubmit}>
      <StyledFormWrapper>
        <StyledInputWrapper wide>
          <Label>Values</Label>
          <StyledInput
            placeholder="ex. 1, 2, 3, 4"
            type="text"
            name="data"
          ></StyledInput>
        </StyledInputWrapper>
        <StyledInputWrapper>
          <Label>Chart Color</Label>
          <ColorList color={color} setColor={setColor} />
        </StyledInputWrapper>
      </StyledFormWrapper>
      <Button tyle="submit">Update chart</Button>
    </StyledForm>
  </StyledWrapper>
);

export default ChartData;
