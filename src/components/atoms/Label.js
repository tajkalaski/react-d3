import styled from "styled-components";

const Label = styled.label`
  color: #a9a9a9;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.medium};
  margin-bottom: 4px;
  display: inline-block;
`;

export default Label;
