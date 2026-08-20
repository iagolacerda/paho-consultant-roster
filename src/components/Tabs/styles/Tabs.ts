import styled from 'styled-components';
import { colors, spacing, typography } from '../../../styles/tokens';

export const TabBar = styled.nav`
  display: flex;
  gap: 0;
  border-bottom: 1px solid ${colors.hairline};
  margin-bottom: ${spacing.xl};
`;

export const TabItem = styled.button<{ $active: boolean }>`
  ${typography.bodyStrong}
  font-size: 15px;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? colors.primary : 'transparent')};
  color: ${({ $active }) => ($active ? colors.primary : colors.inkMuted48)};
  padding: ${spacing.sm} ${spacing.lg};
  cursor: pointer;
  margin-bottom: -1px;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: ${({ $active }) => ($active ? colors.primary : colors.ink)};
  }
`;
