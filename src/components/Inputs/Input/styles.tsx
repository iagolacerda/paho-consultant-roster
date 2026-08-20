// Libs
import styled, { css } from 'styled-components';
// Components
import { colors, radius, typography } from '../../../styles/tokens';

export const inputBase = css`
  ${typography.body}
  color: ${colors.ink};
  background: ${colors.canvasParchment};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${radius.pill};
  padding: 10px 20px;
  height: 44px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s;
  -webkit-appearance: none;
  appearance: none;

  &::placeholder { color: ${colors.inkMuted48}; }
  &:focus { border-color: ${colors.primaryFocus}; background: ${colors.canvas}; }
`;

export const StyledInput = styled.input`${inputBase}`;
