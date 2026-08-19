import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../styles/tokens';

export const Card = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: left;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.12s, box-shadow 0.12s;

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
`;

// min-height reserva espaço para 2 linhas de badges — sem isso, cards com
// uma badge a menos (ou textos mais curtos) ficam com o título alguns
// pixels mais alto que os vizinhos na mesma linha do grid.
export const CardBadges = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex-wrap: wrap;
  min-height: 54px;
  margin-bottom: ${spacing.sm};
`;

export const CardTitle = styled.h3`
  ${typography.bodyStrong}
  color: ${colors.ink};
  margin: 0 0 6px;
`;

export const CardSummary = styled.p`
  ${typography.caption}
  color: ${colors.inkMuted48};
  margin: 0 0 ${spacing.sm};
  line-height: 1.5;
`;

export const CardMeta = styled.div`
  display: flex;
  gap: ${spacing.md};
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: ${spacing.sm};
  ${typography.finePrint}
  color: ${colors.inkMuted48};
`;
