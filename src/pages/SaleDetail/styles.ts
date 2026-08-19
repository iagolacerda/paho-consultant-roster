import styled from 'styled-components';
import { colors, spacing, typography, radius } from '../../styles/tokens';

export const DetailCard = styled.div`
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.xs};
  overflow: hidden;
  margin-bottom: ${spacing.lg};
`;

export const SectionTitle = styled.h2`
  ${typography.bodyStrong}
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${colors.inkMuted48};
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 1px solid ${colors.hairline};
  margin: 0;
`;

export const FieldGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  margin: 0;
`;

export const FieldItem = styled.div`
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 1px solid ${colors.hairline};

  &:last-child {
    border-bottom: none;
  }
`;

export const FieldLabel = styled.dt`
  ${typography.caption}
  color: ${colors.inkMuted48};
  margin-bottom: 4px;
`;

export const FieldValue = styled.dd`
  ${typography.body}
  color: ${colors.ink};
  margin: 0;
  font-variant-numeric: tabular-nums;
`;

export const InvoiceLink = styled.a`
  color: ${colors.primary};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export const SkeletonBlock = styled.div`
  height: 220px;
  background: ${colors.canvasParchment};
  border-radius: ${radius.xs};
  animation: shimmer 1.4s infinite linear;

  @keyframes shimmer {
    0%   { opacity: 1; }
    50%  { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;
