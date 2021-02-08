import styled, { css } from "styled-components";

const ButtonIcon = styled.button`
  display: block;
  width: 67px;
  height: 67px;
  border-radius: 20px;
  border: none;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 40%;
  cursor: pointer;

  &.active {
    /* background-color: #c73131; */
    background-color: #ffffff;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  }

  ${({ secondary }) =>
    secondary &&
    css`
      background-size: 55%;
      width: 37px;
      height: 37px;
      border-radius: 0%;
      border-left: 1px solid #eaeaea;
      background-color: #ffffff;
    `}
`;

export default ButtonIcon;
