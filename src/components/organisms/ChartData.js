import React, { useState } from "react";
import Heading from "./../atoms/Heading";
import Button from "./../atoms/Button";
import ButtonIcon from "./../atoms/ButtonIcon";
import DataInput from "./../atoms/DataInput";
import ColorList from "./../molecules/ColorList";
import Label from "./../atoms/Label";
import styled, { css } from "styled-components";
import trashIcon from "./../../assets/trash-outline.svg";

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
  display: block;

  ${({ wide }) =>
    wide &&
    css`
      width: 65%;
    `}
`;

const StyledFormWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  border-bottom: 1px solid #eceded;
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

const StyledFromInputsWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 24px;
  align-items: flex-end;
  justify-content: space-between;
`;

const StyledLink = styled.a`
  cursor: pointer;
  padding-bottom: 24px;
`;

const StyledParagraph = styled.p`
  padding-bottom: 24px;
  margin: 0;
  color: #c73131;
`;

const ChartData = ({ data, onSubmit, color, setColor, chartType }) => {
  const [chartsData, setChartsData] = useState(data);

  const addNewChart = () => {
    setChartsData([...chartsData, []]);
  };

  const updateChartData = (e, i) => {
    let updatedChartsData = [...chartsData];
    updatedChartsData[i] = e.target.value.split(",").map(Number);
    setChartsData(updatedChartsData);
  };

  const deleteLine = (i) => {
    let updatedChartsData = [...chartsData];
    updatedChartsData.splice(i, 1);
    setChartsData(updatedChartsData);
  };

  return (
    <StyledWrapper>
      <StyledHeading>Chart Data</StyledHeading>
      <StyledForm onSubmit={(e) => onSubmit(e, chartsData)}>
        <StyledFormWrapper>
          {chartsData.map((chart, i) => {
            return (
              <StyledFromInputsWrapper>
                <StyledInputWrapper wide key={i}>
                  <Label>Line #{i + 1}</Label>
                  <StyledInput
                    defaultValue={chart}
                    placeholder="ex. 1, 2, 3, 4"
                    type="text"
                    name="data"
                    onChange={(e) => updateChartData(e, i)}
                  ></StyledInput>
                </StyledInputWrapper>
                <StyledInputWrapper>
                  <Label>Line #{i + 1} Color</Label>
                  <ColorList color={color} setColor={setColor} itemNr={i} />
                </StyledInputWrapper>
                <ButtonIcon
                  disabled={chartsData.length === 1}
                  secondary
                  icon={trashIcon}
                  onClick={deleteLine}
                />
                <br />
              </StyledFromInputsWrapper>
            );
          })}
          {chartsData.length === 5 ? (
            <StyledParagraph>
              You can only have 5 arrays of values
            </StyledParagraph>
          ) : (
            <StyledLink onClick={addNewChart}>+ Add line</StyledLink>
          )}
        </StyledFormWrapper>
        <Button type="submit">Update preview</Button>
      </StyledForm>
    </StyledWrapper>
  );
};

export default ChartData;
