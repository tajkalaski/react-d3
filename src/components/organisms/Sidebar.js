import React from "react";
import ButtonIcon from "./../atoms/ButtonIcon";
import PropTypes from "prop-types";
import styled from "styled-components";
import singleLineIcon from "./../../assets/singleline.svg";
import barIcon from "./../../assets/bars.svg";
import { NavLink, useLocation } from "react-router-dom";

const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 100px;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid #eaeaea;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Sidebar = ({ chartType }) => {
  const { pathname } = useLocation();
  return (
    <StyledWrapper activeChart={chartType}>
      <StyledLinksList>
        <li>
          <ButtonIcon
            as={NavLink}
            to="/line-chart"
            icon={singleLineIcon}
            isActive={() => ["/line-chart", "/"].includes(pathname)}
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
      </StyledLinksList>
    </StyledWrapper>
  );
};

Sidebar.propTypes = {
  pageType: PropTypes.oneOf(["line", "bar"]),
};

Sidebar.defaultProps = {
  pageType: "line",
};

export default Sidebar;
