import styled, { keyframes } from 'styled-components';
import { colors, radius, spacing, typography } from '../../styles/tokens';

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

export const SkeletonBar = styled.span<{ $width?: string }>`
  display: block;
  height: 14px;
  width: ${({ $width }) => $width ?? '70%'};
  border-radius: ${radius.xs};
  background: linear-gradient(
    90deg,
    ${colors.canvasParchment} 25%,
    ${colors.hairline} 50%,
    ${colors.canvasParchment} 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

export const ResultsCard = styled.section`
  background: ${colors.canvas};
  border-radius: ${radius.lg};
  border: 1px solid ${colors.hairline};
  overflow: hidden;
`;

export const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 1px solid ${colors.dividerSoft};
`;

export const ResultsTitle = styled.span`
  ${typography.bodyStrong}
  color: ${colors.ink};
`;

export const ResultsCount = styled.span`
  ${typography.caption}
  color: ${colors.inkMuted48};
`;

// Tabelas de mais de 2 colunas não funcionam em telas estreitas — abaixo de
// 1024px (cobre tablet e celular) a lista empilhada (MobileList) assume.
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Th = styled.th`
  ${typography.captionStrong}
  color: ${colors.inkMuted48};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-align: left;
  white-space: nowrap;
  padding: ${spacing.sm} ${spacing.lg};
  background: ${colors.canvasParchment};
  border-bottom: 1px solid ${colors.hairline};
  font-weight: 600;
`;

export const Td = styled.td`
  ${typography.caption}
  color: ${colors.ink};
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 1px solid ${colors.dividerSoft};
  vertical-align: middle;
`;

export const Tr = styled.tr<{ $clickable?: boolean }>`
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: background 0.1s;
  &:hover td { background: ${({ $clickable }) => ($clickable ? colors.canvasParchment : 'inherit')}; }
  &:last-child td { border-bottom: none; }
`;

export const ChevronTd = styled(Td)`
  width: 40px;
  color: ${colors.inkMuted48};
  text-align: right;
  padding-right: ${spacing.lg};
`;

export const MobileList = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

export const EmptyState = styled.div`
  ${typography.body}
  color: ${colors.inkMuted48};
  text-align: center;
  padding: ${spacing.section} ${spacing.lg};
`;
