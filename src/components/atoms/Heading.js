import styled, { css } from "styled-components";

const Heading = styled.h1`
  font-size: ${({ theme, big }) =>
    big ? theme.fontSize.xl : theme.fontSize.m};
  font-weight: ${({ theme, big }) => (big ? theme.boldish : theme.bold)};
  color: #1f1f1f;
  text-align: center;
  padding: 24px;
  margin: 0;

  ${({ big }) =>
    big &&
    css`
      padding: 48px 32px 32px 32px;
    `}/* */
`;

export default Heading;
