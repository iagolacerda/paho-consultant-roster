// Libs
import styled from 'styled-components';
// Components
import { breakpoints, colors, spacing } from '../../../styles/tokens';

// No desktop mostra só marca + idioma (a navegação e as informações do
// usuário moram na sidebar, ver components/Sidebar); no mobile, onde a
// sidebar some, também carrega o menu do usuário — ver Navbar.tsx.
export const Bar = styled.header`
  height: 60px;
  flex: 0 0 60px;
  background: ${colors.canvas};
  border-bottom: 1px solid ${colors.hairline};
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: 0 ${spacing.xl};
  z-index: 50;

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0 ${spacing.md};
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;
