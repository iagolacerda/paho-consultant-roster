// Libs
import styled from 'styled-components';
// Components
import { colors, radius, typography } from '../../../styles/tokens';
import { inputBase } from '../Input/styles';

export const Wrap = styled.div`
  position: relative;
`;

export const Trigger = styled.button`
  ${inputBase}
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a7a7a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const TriggerLabel = styled.span<{ $placeholder?: boolean }>`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ $placeholder }) => ($placeholder ? colors.inkMuted48 : colors.ink)};
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 280px;
  overflow-y: auto;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 40;
  padding: 6px;
`;

export const OptionRow = styled.button<{ $active?: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  background: ${({ $active }) => ($active ? colors.canvasParchment : 'none')};
  border: none;
  border-radius: ${radius.xs};
  padding: 7px 10px;
  ${typography.caption}
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${colors.ink};
  cursor: pointer;

  &:hover {
    background: ${colors.canvasParchment};
  }
`;
