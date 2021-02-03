import styled from "styled-components";

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
`;

export default Button;
