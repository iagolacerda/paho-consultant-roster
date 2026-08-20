import styled from 'styled-components';
import { colors, radius, typography } from '../../../../styles/tokens';

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${radius.pill};
  padding: 6px 12px 6px 6px;
  cursor: pointer;

  &:hover {
    background: ${colors.canvasParchment};
  }
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
`;

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Linhas de opção reaproveitadas tanto no corpo do menu mobile em tela
// cheia (UserMenu) quanto — futuramente — em qualquer outro menu de ações
// simples que precise dessa mesma aparência.
export const DropdownItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 12px 4px;
  ${typography.body}
  color: ${({ $danger }) => ($danger ? colors.danger : colors.ink)};
  cursor: pointer;

  &:hover {
    background: ${({ $danger }) => ($danger ? 'rgba(192, 57, 43, 0.06)' : colors.canvasParchment)};
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: ${colors.dividerSoft};
  margin: 8px 0;
`;
