import styled from "styled-components";

const Button = styled.li`
  background-color: ${({ theme, color }) => theme[color].normal};
  display: inline-block;
  width: 25px;
  height: 25px;
  margin: 2px;

  &.active {
    border: 2px solid ${({ theme, color }) => theme[color].dark};
  }
`;

export default Button;
