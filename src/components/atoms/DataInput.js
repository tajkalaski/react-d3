import styled, { css } from "styled-components";

const Input = styled.input`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.light};
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #ededed;
  margin-bottom: 0px;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey300};
  }
`;

export default Input;
