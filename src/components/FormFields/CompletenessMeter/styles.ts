import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../styles/tokens';

export const MeterTrack = styled.div`
  height: 6px;
  border-radius: ${radius.pill};
  background: ${colors.dividerSoft};
  overflow: hidden;
  margin: ${spacing.xs} 0 ${spacing.sm};
`;

export const MeterFill = styled.div<{ $pct: number; $ok: boolean }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $ok }) => ($ok ? colors.success : colors.primary)};
  transition: width 0.3s;
`;

export const ScoreLabel = styled.p`
  ${typography.captionStrong}
  color: ${colors.ink};
  margin: 0 0 4px;
`;

export const MissingList = styled.ul`
  margin: ${spacing.sm} 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MissingItem = styled.li`
  ${typography.caption}
  color: ${colors.inkMuted48};
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '○';
    color: ${colors.bodyMuted};
  }
`;
