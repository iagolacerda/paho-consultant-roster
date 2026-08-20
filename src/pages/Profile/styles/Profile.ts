import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../styles/tokens';

// min-height compartilhado com LinkCard — sem isso os dois cards ficam com
// alturas diferentes dependendo de quantas linhas cada texto quebra em telas
// estreitas (a descrição do perfil profissional é bem mais longa).
export const AccountCard = styled.button`
  width: 100%;
  min-height: 92px;
  box-sizing: border-box;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
  text-align: left;
  cursor: pointer;
  transition: border-color 0.12s, box-shadow 0.12s;

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
`;

export const AvatarLg = styled.span`
  width: 40px;
  height: 40px;
  border-radius: ${radius.pill};
  background: ${colors.surfaceTile1};
  color: ${colors.onDark};
  display: grid;
  place-items: center;
  ${typography.caption}
  font-weight: 600;
  flex: 0 0 40px;
`;

export const AccountName = styled.p`
  ${typography.bodyStrong}
  color: ${colors.ink};
  margin: 0 0 2px;
`;

export const AccountDetail = styled.p`
  ${typography.caption}
  color: ${colors.inkMuted48};
  margin: 0;
`;

export const LinkCard = styled.button`
  display: flex;
  width: 100%;
  min-height: 92px;
  box-sizing: border-box;
  align-items: center;
  gap: ${spacing.md};
  text-align: left;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  cursor: pointer;
  transition: border-color 0.12s, box-shadow 0.12s;

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
`;

export const LinkIcon = styled.span`
  width: 40px;
  height: 40px;
  border-radius: ${radius.sm};
  background: ${colors.canvasParchment};
  color: ${colors.primary};
  display: grid;
  place-items: center;
  flex: 0 0 40px;
`;

export const LinkTitle = styled.p`
  ${typography.bodyStrong}
  color: ${colors.ink};
  margin: 0 0 2px;
`;

export const LinkDescription = styled.p`
  ${typography.caption}
  color: ${colors.inkMuted48};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Chevron = styled.span`
  margin-left: auto;
  color: ${colors.inkMuted48};
`;

export const LogoutRow = styled.div`
  margin-top: ${spacing.lg};
  text-align: center;
`;
