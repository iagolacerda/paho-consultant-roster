import styled from 'styled-components';
import { colors, radius, typography } from '../../styles/tokens';

export const LangSelect = styled.select`
  ${typography.finePrint}
  font-weight: 600;
  color: ${colors.ink};
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.pill};
  padding: 6px 28px 6px 12px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237a7a7a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;

  &:hover {
    border-color: ${colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primaryFocus};
  }
`;
