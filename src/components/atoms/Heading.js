import styled from "styled-components";

const Heading = styled.h1`
  font-size: ${({ theme, big }) =>
    big ? theme.fontSize.xl : theme.fontSize.m};
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
`;

export default Heading;
