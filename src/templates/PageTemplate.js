import React from "react";
import PropTypes from "prop-types";
import Sidebar from "./../components/organisms/Sidebar";

const PageTemplate = ({ children, chartType }) => (
  <>
    <Sidebar chartType={chartType} />
    {children}
  </>
);

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  chartType: PropTypes.oneOf(["singleline", "bar", "multiline"]),
};

PageTemplate.defaultProps = {
  chartType: "singleline",
};

export default PageTemplate;
