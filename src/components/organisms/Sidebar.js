import ButtonIcon from "./../atoms/ButtonIcon";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import singleLineIcon from "./../../assets/singleline.svg";
import multiLineIcon from "./../../assets/multiline.svg";
import barIcon from "./../../assets/bars.svg";
import { NavLink } from "react-router-dom";

const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 150px;
  height: 100vh;
  background-color: ${({ theme }) => theme.grey.normal};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Sidebar = ({ chartType }) => (
  <StyledWrapper activeChart={chartType}>
    <StyledLinksList>
      <li>
        <ButtonIcon
          as={NavLink}
          to="/single-line-chart"
          icon={singleLineIcon}
          activeClassName="active"
        />
      </li>
      <li>
        <ButtonIcon
          as={NavLink}
          to="/bar-chart"
          icon={barIcon}
          activeClassName="active"
        />
      </li>
      <li>
        <ButtonIcon
          as={NavLink}
          to="/multiple-line-chart"
          icon={multiLineIcon}
          activeClassName="active"
        />
      </li>
    </StyledLinksList>
  </StyledWrapper>
);

Sidebar.propTypes = {
  pageType: PropTypes.oneOf(["singleline", "bar", "multiline"]),
};

Sidebar.defaultProps = {
  pageType: "singleline",
};

export default Sidebar;
