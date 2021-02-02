import styled from "styled-components";

const Button = styled.button`
  width: 30%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  padding: 8px 16px;
  border: 1px dashed #d4d4d4;
  color: #d4d4d4;
  margin-top: 8px;
  background: none;
  border-radius: 3px;
`;

export default Button;
