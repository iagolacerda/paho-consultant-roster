import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../../styles/tokens';

export const AssistCard = styled.div`
  border: 1px solid ${colors.hairline};
  background: ${colors.canvas};
  border-radius: ${radius.lg};
  padding: ${spacing.md};
  margin-bottom: ${spacing.md};
  display: flex;
  gap: ${spacing.md};
  align-items: flex-start;
`;

export const AssistBadge = styled.span`
  width: 32px;
  height: 32px;
  border-radius: ${radius.sm};
  flex: 0 0 32px;
  background: ${colors.primary};
  display: grid;
  place-items: center;
  color: ${colors.onPrimary};
  font-size: 15px;
`;

export const AssistTitle = styled.h3`
  ${typography.bodyStrong}
  color: ${colors.ink};
  margin: 0 0 4px;
`;

export const AssistText = styled.p`
  ${typography.caption}
  color: ${colors.inkMuted48};
  margin: 0 0 ${spacing.sm};
  line-height: 1.5;
`;

export const AssistActions = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
  align-items: center;
`;

export const UploadLabel = styled.label`
  input {
    display: none;
  }
`;

export const ProgressTrack = styled.div`
  height: 5px;
  border-radius: ${radius.pill};
  background: ${colors.dividerSoft};
  overflow: hidden;
  width: 220px;
  max-width: 100%;
  margin-top: 8px;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: 45%;
  background: ${colors.primary};
  border-radius: ${radius.pill};
  animation: slide 1.2s ease-in-out infinite;

  @keyframes slide {
    0% { margin-left: 0%; width: 30%; }
    50% { margin-left: 65%; width: 35%; }
    100% { margin-left: 0%; width: 30%; }
  }
`;

export const SummaryList = styled.ul`
  margin: ${spacing.sm} 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SummaryItem = styled.li`
  ${typography.caption}
  color: ${colors.ink};
  display: flex;
  gap: 8px;

  &::before {
    content: '—';
    color: ${colors.inkMuted48};
  }
`;
