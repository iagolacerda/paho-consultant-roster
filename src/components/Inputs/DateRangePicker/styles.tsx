// Libs
import styled, { css } from 'styled-components';
// Components
import { colors, radius, typography } from '../../../styles/tokens';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Trigger = styled.button`
  ${typography.body}
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  padding: 0 16px;
  background: ${colors.canvasParchment};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${radius.pill};
  color: ${colors.ink};
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;

  &:hover,
  &:focus {
    border-color: ${colors.primaryFocus};
    background: ${colors.canvas};
  }

  svg {
    color: ${colors.inkMuted48};
    flex-shrink: 0;
  }
`;

export const TriggerText = styled.span<{ $placeholder?: boolean }>`
  flex: 1;
  color: ${({ $placeholder }) => ($placeholder ? colors.inkMuted48 : colors.ink)};
`;

export const Popover = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 50;
  width: 280px;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14);
  padding: 12px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const MonthLabel = styled.span`
  ${typography.bodyStrong}
  color: ${colors.ink};
  text-transform: capitalize;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: ${colors.inkMuted48};
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${colors.canvasParchment};
    color: ${colors.ink};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const Weekday = styled.span`
  ${typography.caption}
  color: ${colors.inkMuted48};
  text-align: center;
  padding: 4px 0;
`;

export const Day = styled.button<{ $muted?: boolean; $selected?: boolean; $inRange?: boolean }>`
  ${typography.caption}
  height: 32px;
  border: none;
  cursor: pointer;
  border-radius: ${radius.sm};
  background: transparent;
  color: ${({ $muted }) => ($muted ? colors.bodyMuted : colors.ink)};
  transition: background 0.1s;

  ${({ $inRange }) =>
    $inRange &&
    css`
      background: rgba(12, 59, 94, 0.12);
      border-radius: 0;
    `}

  ${({ $selected }) =>
    $selected &&
    css`
      background: ${colors.primary};
      color: ${colors.onPrimary};
    `}

  &:hover {
    background: ${({ $selected }) => ($selected ? colors.primaryFocus : 'rgba(12, 59, 94, 0.18)')};
  }
`;
