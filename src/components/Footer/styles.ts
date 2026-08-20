import styled from 'styled-components';
import { colors, media, spacing, typography } from '../../styles/tokens';

// Altura fixa desse rodapé — usada por App.tsx (padding-bottom do MainArea) e
// por ConsultantProfile/styles.ts (FooterBar e FooterSpacerBlock) para não
// sobrepor nem deixar espaço faltando no scroll.
export const FOOTER_HEIGHT = 56;

// Fixo na parte inferior, só sobre a área de conteúdo — largura descontando
// a sidebar (220px, ver components/Sidebar/styles.ts), que some no mesmo
// breakpoint. A sidebar já se estende até o fim da tela por conta própria,
// então a faixa abaixo dela não precisa de nada do rodapé por cima.
export const Bar = styled.footer`
  height: ${FOOTER_HEIGHT}px;
  position: fixed;
  bottom: 0;
  left: 220px;
  right: 0;
  background: ${colors.canvas};
  border-top: 1px solid ${colors.hairline};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  padding: 0 ${spacing.xl};
  z-index: 50;

  ${media.md} {
    left: 0;
  }

  ${media.sm} {
    padding: 0 ${spacing.md};
  }
`;

export const SessionInfo = styled.span`
  ${typography.caption}
  color: ${colors.inkMuted48};
  white-space: nowrap;
`;

export const Clock = styled.span`
  ${typography.caption}
  color: ${colors.inkMuted48};
  white-space: nowrap;
`;
