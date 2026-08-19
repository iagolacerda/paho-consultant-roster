import styled from 'styled-components';
import { colors, spacing } from '../../styles/tokens';

export const SidebarShell = styled.nav`
  width: 220px;
  flex: 0 0 220px;
  background: ${colors.canvas};
  border-right: 1px solid ${colors.hairline};
  padding: ${spacing.lg} ${spacing.sm};
  overflow-y: auto;

  // A navegação principal mora no menu do usuário (navbar) em telas
  // estreitas — a sidebar não tem espaço para existir ali.
  @media (max-width: 860px) {
    display: none;
  }
`;
