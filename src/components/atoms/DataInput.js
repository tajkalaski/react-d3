import styled, { css } from "styled-components";

const Input = styled.input`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.light};
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ededed;
  margin-bottom: 0px;
  font-family: "Montserrat", sans-serif;

  ::placeholder {
    color: ${({ theme }) => theme.grey.normal};
  }
`;

export default Input;
