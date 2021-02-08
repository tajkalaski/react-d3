import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Heading from "../components/atoms/Heading";
import PageTemplate from "./PageTemplate";

const StyledHeading = styled(Heading)`
  text-transform: capitalize;
`;
const LayoutTemplate = ({ children, chartType }) => (
  <PageTemplate chartType={chartType}>
    <div>
      <StyledHeading big>{chartType} chart</StyledHeading>
      {children}
    </div>
  </PageTemplate>
);

LayoutTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  chartType: PropTypes.oneOf(["bar", "line"]),
};

LayoutTemplate.defaultProps = {
  chartType: "line",
};

export default LayoutTemplate;
