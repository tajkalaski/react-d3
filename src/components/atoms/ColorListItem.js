import styled from "styled-components";

const Button = styled.li`
  background-color: ${({ theme, color }) => theme[color].normal};
  display: inline-block;
  border-radius: 4px;
  width: 37px;
  height: 37px;
  margin: 0px 2px;
  cursor: pointer;

  &.active {
    background-image: url(${({ icon }) => icon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 40%;
  }
`;

export default Button;
