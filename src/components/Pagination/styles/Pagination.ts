import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../styles/tokens';

export const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md} ${spacing.lg};
  border-top: 1px solid ${colors.hairline};
`;

export const PaginationInfo = styled.span`
  ${typography.caption}
  color: ${colors.inkMuted48};
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xxs};
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  ${typography.caption}
  min-width: 32px;
  height: 32px;
  padding: 0 ${spacing.xs};
  border-radius: ${radius.sm};
  border: 1px solid ${({ $active }) => ($active ? colors.primary : colors.hairline)};
  background: ${({ $active }) => ($active ? colors.primary : colors.canvas)};
  color: ${({ $active }) => ($active ? colors.onPrimary : colors.ink)};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  transition: background 0.15s, border-color 0.15s;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? colors.primary : colors.canvasParchment)};
    border-color: ${({ $active }) => ($active ? colors.primary : colors.inkMuted48)};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

export const Ellipsis = styled.span`
  ${typography.caption}
  color: ${colors.inkMuted48};
  padding: 0 ${spacing.xxs};
`;
