import styled from 'styled-components';
import { colors, media, radius, spacing, typography } from '../../styles/tokens';

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

  ${media.sm} {
    padding: 0 ${spacing.md};
  }
`;

export const LangSwitch = styled.div`
  display: flex;
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.pill};
  overflow: hidden;
`;

export const LangButton = styled.button<{ $active?: boolean }>`
  ${typography.finePrint}
  font-weight: 600;
  border: none;
  background: ${({ $active }) => ($active ? colors.primary : 'transparent')};
  color: ${({ $active }) => ($active ? colors.onPrimary : colors.inkMuted48)};
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: ${({ $active }) => ($active ? colors.primaryFocus : colors.canvasParchment)};
  }
`;

export const Brand = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  ${typography.bodyStrong}
  color: ${colors.ink};
  white-space: nowrap;
`;

export const BrandMark = styled.span`
  width: 30px;
  height: 30px;
  border-radius: ${radius.sm};
  background: ${colors.primary};
  flex: 0 0 30px;
`;

export const BrandText = styled.span`
  @media (max-width: 380px) {
    display: none;
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const UserArea = styled.div`
  position: relative;
`;

export const UserButton = styled.button<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ $open }) => ($open ? colors.canvasParchment : 'transparent')};
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

  ${media.xs} {
    display: none;
  }
`;

export const Chevron = styled.span<{ $open?: boolean }>`
  color: ${colors.inkMuted48};
  font-size: 10px;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.12s;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 60;
`;

export const DropdownItem = styled.button<{ $danger?: boolean }>`
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

export const DropdownDivider = styled.div`
  height: 1px;
  background: ${colors.dividerSoft};
  margin: 4px 0;
`;
