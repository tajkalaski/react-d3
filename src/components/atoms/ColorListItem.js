import styled from "styled-components";

const Button = styled.li`
  background-color: ${({ theme, color }) => theme[color].normal};
  display: inline-block;
  width: 25px;
  height: 25px;
  margin: 2px;

  &.active {
    border: 2px solid ${({ theme, color }) => theme[color].dark};
    background-image: url(${({ icon }) => icon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 40%;
  }
`;

export default Button;
