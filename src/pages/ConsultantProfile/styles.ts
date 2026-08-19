import styled from 'styled-components';
import { colors, media, radius, spacing, typography } from '../../styles/tokens';

// Grid com uma coluna de 96px por etapa (círculo e rótulo caem na mesma
// coluna, então centralizam juntos automaticamente) e uma coluna 1fr entre
// elas para a linha conectora. Linha 1 = círculos/conectores (altura fixa
// de 30px, então tudo nela centraliza sozinho); linha 2 = rótulos. Isso
// substitui o cálculo manual de margem, que desalinhava a linha do círculo.
// No mobile os rótulos por etapa não cabem — a coluna encolhe para só o
// círculo e o nome da etapa atual aparece à parte, abaixo da barra
// (ver MobileStepLabel / StepLabelButton).
export const StepBar = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns - 1}, 96px 1fr) 96px`};
  grid-template-rows: 30px auto;
  margin-bottom: ${spacing.xl};
  overflow-x: auto;
  padding: 4px 2px 10px;

  ${media.sm} {
    grid-template-columns: ${({ $columns }) => `repeat(${$columns - 1}, 30px 1fr) 30px`};
    grid-template-rows: 30px;
    margin-bottom: 0;
  }
`;

export const MobileStepLabel = styled.p`
  display: none;

  ${media.sm} {
    display: block;
    ${typography.captionStrong}
    color: ${colors.ink};
    margin: ${spacing.sm} 0 ${spacing.xl};
  }
`;

export const StepButton = styled.button`
  display: flex;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  grid-row: 1;
`;

export const StepLabelButton = styled.button`
  display: block;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 4px 0;
  text-align: center;
  grid-row: 2;

  ${media.sm} {
    display: none;
  }
`;

export const StepCircle = styled.span<{ $done?: boolean; $now?: boolean }>`
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  border-radius: ${radius.pill};
  display: grid;
  place-items: center;
  ${typography.captionStrong}
  border: 2px solid ${({ $done, $now }) => ($done || $now ? colors.primary : colors.bodyMuted)};
  background: ${({ $done }) => ($done ? colors.primary : colors.canvas)};
  color: ${({ $done, $now }) => ($done ? colors.onPrimary : $now ? colors.primary : colors.inkMuted48)};
`;

export const StepConnector = styled.span<{ $done?: boolean }>`
  align-self: center;
  height: 2px;
  background: ${({ $done }) => ($done ? colors.primary : colors.hairline)};
  grid-row: 1;
`;

export const StepTitle = styled.span<{ $now?: boolean }>`
  ${typography.finePrint}
  font-weight: ${({ $now }) => ($now ? 700 : 400)};
  color: ${({ $now }) => ($now ? colors.ink : colors.inkMuted48)};
  text-align: center;
  line-height: 1.3;
`;

// Barra fixa na parte inferior da tela — largura descontando a sidebar
// (220px, ver components/Sidebar/styles.ts), que some no mesmo breakpoint.
export const FooterBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-wrap: wrap;
  position: fixed;
  bottom: 0;
  left: 220px;
  right: 0;
  background: ${colors.canvas};
  border-top: 1px solid ${colors.hairline};
  padding: ${spacing.md} ${spacing.xl};
  z-index: 45;

  ${media.md} {
    left: 0;
  }

  ${media.sm} {
    padding: ${spacing.sm} ${spacing.md};
  }
`;

// Reserva espaço no fim do conteúdo para a FooterBar fixa não cobrir nada.
export const FooterSpacerBlock = styled.div`
  height: 76px;
`;

export const FooterSpacer = styled.span`
  flex: 1;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px ${spacing.md};
  font-size: 13px;
`;

export const SummaryTerm = styled.dt`
  ${typography.caption}
  color: ${colors.inkMuted48};
`;

export const SummaryValue = styled.dd`
  ${typography.caption}
  color: ${colors.ink};
  margin: 0;
`;
