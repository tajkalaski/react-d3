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
  chartType: PropTypes.oneOf(["line", "bar"]),
};

PageTemplate.defaultProps = {
  chartType: "line",
};

export default PageTemplate;
