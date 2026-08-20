import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../styles/tokens';

export const DetailCard = styled.div`
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: ${spacing.sm};
`;

export const MetaGrid = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px ${spacing.md};
  margin: ${spacing.md} 0 ${spacing.lg};
  padding: ${spacing.md} 0;
  border-top: 1px solid ${colors.dividerSoft};
  border-bottom: 1px solid ${colors.dividerSoft};
`;

export const MetaTerm = styled.dt`
  ${typography.caption}
  color: ${colors.inkMuted48};
`;

export const MetaValue = styled.dd`
  ${typography.caption}
  color: ${colors.ink};
  margin: 0;
  font-weight: 600;
`;

export const SectionLabel = styled.h2`
  ${typography.bodyStrong}
  color: ${colors.ink};
  margin: ${spacing.lg} 0 ${spacing.xs};
`;

export const BodyText = styled.p`
  ${typography.body}
  color: ${colors.inkMuted80};
  line-height: 1.6;
  margin: 0;
`;

export const RequirementsList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RequirementItem = styled.li`
  ${typography.body}
  color: ${colors.inkMuted80};
`;
