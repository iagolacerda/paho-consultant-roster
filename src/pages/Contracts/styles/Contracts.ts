// Libs
import styled from 'styled-components';
// Components
import { colors, radius, spacing, typography } from '../../../styles/tokens';

export const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacing.xs};
  position: relative;
`;

export const IconButton = styled.button`
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: grid;
  place-items: center;
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.pill};
  background: ${colors.canvas};
  color: ${colors.ink};
  cursor: pointer;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;

export const ManageDropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 210px;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 30;
`;

export const ManageItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 10px 14px;
  ${typography.caption}
  color: ${({ $danger }) => ($danger ? colors.danger : colors.ink)};
  cursor: pointer;

  &:hover {
    background: ${({ $danger }) => ($danger ? 'rgba(192, 57, 43, 0.06)' : colors.canvasParchment)};
  }
`;

export const MobileCard = styled.div<{ $clickable?: boolean }>`
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.lg};
  padding: ${spacing.md};
  margin-bottom: ${spacing.sm};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: background 0.1s;

  &:hover {
    background: ${({ $clickable }) => ($clickable ? colors.canvasParchment : colors.canvas)};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MobileCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.sm};
`;

export const MobileCardTitle = styled.p`
  ${typography.captionStrong}
  color: ${colors.ink};
  margin: 0;
`;

export const MobileCardMeta = styled.p`
  ${typography.finePrint}
  color: ${colors.inkMuted48};
  margin: 6px 0 0;
`;

export const MobileCardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacing.xs};
  margin-top: ${spacing.sm};
  position: relative;
`;
