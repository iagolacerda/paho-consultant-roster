import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../../styles/tokens';
import { inputBase } from '../../../../components/Inputs/Input/styles';

export const Picker = styled.div`
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  background: ${colors.canvas};
  overflow: hidden;
`;

export const SearchBar = styled.div`
  padding: ${spacing.xs} ${spacing.sm};
  border-bottom: 1px solid ${colors.dividerSoft};

  input {
    ${inputBase}
    border: none;
    background: transparent;
    height: 32px;
    padding: 4px 6px;
  }
`;

export const PickerList = styled.div`
  max-height: 220px;
  overflow-y: auto;
  padding: 6px;
`;

export const GroupLabel = styled.div`
  ${typography.finePrint}
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${colors.inkMuted48};
  font-weight: 600;
  padding: 8px 8px 4px;
`;

export const PickerItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  background: ${({ $active }) => ($active ? 'rgba(12, 59, 94, 0.08)' : 'transparent')};
  border: none;
  border-radius: ${radius.xs};
  padding: 7px 8px;
  cursor: pointer;
  ${typography.caption}
  color: ${({ $active }) => ($active ? colors.primaryFocus : colors.ink)};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  &:hover {
    background: ${colors.canvasParchment};
  }
`;

export const Check = styled.span<{ $active?: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid ${({ $active }) => ($active ? colors.primary : colors.bodyMuted)};
  background: ${({ $active }) => ($active ? colors.primary : 'transparent')};
  color: #fff;
  font-size: 10px;
  display: grid;
  place-items: center;
  flex: 0 0 14px;
`;

export const EmptyResult = styled.div`
  ${typography.caption}
  color: ${colors.inkMuted48};
  padding: ${spacing.md};
  text-align: center;
`;

export const SelectedTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${spacing.md};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  overflow: hidden;

  td {
    padding: 8px 12px;
    border-bottom: 1px solid ${colors.dividerSoft};
    ${typography.caption}
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${colors.inkMuted48};
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 4px;

  &:hover {
    color: ${colors.danger};
  }
`;
