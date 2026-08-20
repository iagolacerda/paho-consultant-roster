import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../styles/tokens';
import { inputBase } from '../../Inputs/Input/styles';

export const Wrap = styled.div`
  position: relative;
`;

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: ${spacing.xs};
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${colors.canvasParchment};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.pill};
  padding: 5px 6px 5px 14px;
  ${typography.caption}
  color: ${colors.ink};
`;

export const RemoveBadge = styled.button`
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: ${radius.pill};
  background: none;
  border: none;
  color: ${colors.inkMuted48};
  cursor: pointer;
  font-size: 13px;
  line-height: 1;

  &:hover {
    background: ${colors.hairline};
    color: ${colors.ink};
  }
`;

export const SearchInput = styled.input`
  ${inputBase}
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 220px;
  overflow-y: auto;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 20;
  padding: 6px;
`;

export const DropdownOption = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-radius: ${radius.xs};
  padding: 7px 10px;
  ${typography.caption}
  color: ${colors.ink};
  cursor: pointer;

  &:hover {
    background: ${colors.canvasParchment};
  }
`;

export const EmptyOption = styled.div`
  ${typography.caption}
  color: ${colors.inkMuted48};
  padding: 8px 10px;
`;

export const LimitHint = styled.p`
  ${typography.finePrint}
  color: ${colors.inkMuted48};
  margin: 6px 0 0;
`;
