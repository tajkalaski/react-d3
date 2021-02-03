import styled from "styled-components";

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

  &.active {
    /* background-color: #c73131; */
    background-color: #ffffff;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  }
`;

export default ButtonIcon;
