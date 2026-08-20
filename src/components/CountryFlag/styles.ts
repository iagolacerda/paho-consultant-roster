import styled from 'styled-components';
import { colors } from '../../styles/tokens';

export const FlagIcon = styled.span<{ $size?: number }>`
  display: inline-block;
  width: ${({ $size = 18 }) => $size}px;
  height: ${({ $size = 18 }) => Math.round(($size * 3) / 4)}px;
  border-radius: 2px;
  box-shadow: 0 0 0 1px ${colors.hairline};
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  flex: 0 0 auto;
  vertical-align: middle;
`;

export const FlagPlaceholder = styled.span<{ $size?: number }>`
  display: inline-block;
  width: ${({ $size = 18 }) => $size}px;
  height: ${({ $size = 18 }) => Math.round(($size * 3) / 4)}px;
  border-radius: 2px;
  background: ${colors.canvasParchment};
  box-shadow: 0 0 0 1px ${colors.hairline};
  flex: 0 0 auto;
  vertical-align: middle;
`;
