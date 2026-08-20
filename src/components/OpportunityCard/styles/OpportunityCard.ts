import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../styles/tokens';

export const Card = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: left;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.lg};
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.12s, box-shadow 0.12s;

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
`;

export const CardHeader = styled.div`
  background: ${colors.primarySurface};
  border-bottom: 1px solid ${colors.hairline};
  padding: ${spacing.md} ${spacing.lg};
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${spacing.md} ${spacing.lg} ${spacing.lg};
`;

export const CardBadges = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: ${spacing.xs};
`;

export const CardTitle = styled.h3`
  ${typography.bodyStrong}
  color: ${colors.primary};
  margin: 0;
`;

export const CardSummary = styled.p`
  ${typography.caption}
  color: ${colors.inkMuted48};
  margin: 0 0 ${spacing.sm};
  line-height: 1.5;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  margin-top: auto;
  padding-top: ${spacing.sm};
  ${typography.finePrint}
  color: ${colors.inkMuted48};
`;
