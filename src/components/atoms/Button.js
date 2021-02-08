import styled, { css } from "styled-components";

const Button = styled.button`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  font-family: "Montserrat", sans-serif;
  padding: 12px 24px;
  color: #fff;
  margin: 24px auto 0px auto;
  background: #c73131;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  ${({ secondary }) =>
    secondary &&
    css`
      background: none;
      border: 2px dashed #d1d2d2;
      width: 75%;
      color: #d1d2d2;
      margin: 24px 0px 0px 0px;
      padding: 8px 24px;
    `}
`;

export default Button;
