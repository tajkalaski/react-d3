import React, { useState } from "react";
import { theme } from "./../theme/theme";
import Heading from "./../components/atoms/Heading";
import Paragraph from "./../components/atoms/Paragraph";
import Button from "./../components/atoms/Button";
import DataInput from "./../components/atoms/DataInput";
import ColorListItem from "./../components/atoms/ColorListItem";
import styled from "styled-components";
import checkedIcon from "./../assets/tick.svg";
import SingleLineChart from "./../components/organisms/SingleLineChart";
import LayoutTemplate from "./../templates/LayoutTemplate";

const StyledHeading = styled(Heading)`
  letter-spacing: -0.5px;
  border-bottom: 1px solid #eceded;
  padding: 0px 0px 10px 15px;
`;

const StyledWrapper = styled.div`
  width: 700px;
  background: white;
  margin: 16px auto;
  border-radius: 5px;
  border: 1px solid #eceded;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled(DataInput)`
  width: 75%;
`;

const StyledForm = styled.form`
  padding: 8px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SingleLineChartView = () => {
  const array = [12, 20, 21, 28, 36, 26, 47];

  const [data, setData] = useState(array);
  const [color, setColor] = useState("purple");

  const updateData = (evt) => {
    evt.preventDefault();
    const inputData = evt.currentTarget.data.value;
    let updatedData = inputData.split(",").map(Number);
    setData(updatedData);
  };

  return (
    <LayoutTemplate chartType="singleline">
      <StyledWrapper>
        <StyledHeading>Chart Data</StyledHeading>
        <StyledForm onSubmit={updateData}>
          <Paragraph>Values...</Paragraph>
          <StyledInputWrapper>
            <StyledInput
              placeholder="Type your values..."
              type="text"
              name="data"
            ></StyledInput>
            <div className="color-input">
              <ul class="colors">
                <ColorListItem
                  color="blue"
                  icon={checkedIcon}
                  onClick={() => setColor(theme.blue.normal)}
                  className={color === theme.blue.normal ? "active" : ""}
                ></ColorListItem>
                <ColorListItem
                  color="orange"
                  icon={checkedIcon}
                  onClick={() => setColor(theme.orange.normal)}
                  className={color === theme.orange.normal ? "active" : ""}
                ></ColorListItem>
                <ColorListItem
                  color="red"
                  icon={checkedIcon}
                  onClick={() => setColor(theme.red.normal)}
                  className={color === theme.red.normal ? "active" : ""}
                ></ColorListItem>
                <ColorListItem
                  color="green"
                  icon={checkedIcon}
                  onClick={() => setColor(theme.green.normal)}
                  className={color === theme.green.normal ? "active" : ""}
                ></ColorListItem>
                <ColorListItem
                  color="grey"
                  icon={checkedIcon}
                  onClick={() => setColor(theme.grey.normal)}
                  className={color === theme.grey.normal ? "active" : ""}
                ></ColorListItem>
              </ul>
            </div>
          </StyledInputWrapper>
          <Button tyle="submit">Create</Button>
        </StyledForm>
      </StyledWrapper>
      <SingleLineChart data={data} color={color}></SingleLineChart>
    </LayoutTemplate>
  );
};

export default SingleLineChartView;
