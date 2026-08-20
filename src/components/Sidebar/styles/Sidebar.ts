import styled from 'styled-components';
import { breakpoints, colors, radius, spacing, typography } from '../../../styles/tokens';

export const SidebarShell = styled.nav`
  width: 220px;
  flex: 0 0 220px;
  background: ${colors.canvas};
  border-right: 1px solid ${colors.hairline};
  padding: ${spacing.lg} ${spacing.sm};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};

  // A navegação e as informações do usuário moram na navbar em telas
  // estreitas — a sidebar não tem espaço para existir ali.
  @media (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

export const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
`;

export const Avatar = styled.span`
  width: 30px;
  height: 30px;
  border-radius: ${radius.pill};
  background: ${colors.surfaceTile1};
  color: ${colors.onDark};
  display: grid;
  place-items: center;
  ${typography.finePrint}
  font-weight: 600;
  flex: 0 0 30px;
`;

export const UserName = styled.span`
  ${typography.caption}
  color: ${colors.ink};
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SidebarDivider = styled.div`
  height: 1px;
  background: ${colors.dividerSoft};
  margin: ${spacing.xs} 0;
`;
