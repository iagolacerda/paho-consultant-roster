import styled from 'styled-components';
import { colors, spacing, typography } from '../../styles/tokens';

export const ListRow = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid ${colors.dividerSoft};
  padding: ${spacing.sm} ${spacing.md};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${colors.canvasParchment};
  }
`;

export const RowMain = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RowTitle = styled.p`
  ${typography.captionStrong}
  color: ${colors.ink};
  margin: 0 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const RowMeta = styled.p`
  ${typography.finePrint}
  color: ${colors.inkMuted48};
  margin: 0;
`;

export const RowChevron = styled.span`
  color: ${colors.inkMuted48};
  flex: 0 0 auto;
`;
