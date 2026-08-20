// Libs
import styled from 'styled-components';
// Components
import { colors, radius, spacing, typography } from '../../../../styles/tokens';

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Option = styled.label<{ $active?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border: 1px solid ${({ $active }) => ($active ? colors.primary : colors.hairline)};
  background: ${({ $active }) => ($active ? 'rgba(12, 59, 94, 0.06)' : colors.canvas)};
  border-radius: ${radius.md};
  padding: ${spacing.sm} ${spacing.md};
  cursor: pointer;
  transition: border-color 0.12s, background 0.12s;

  &:hover {
    border-color: ${colors.primary};
  }

  input {
    margin-top: 3px;
    accent-color: ${colors.primary};
  }
`;

export const OptionText = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const OptionTitle = styled.span`
  ${typography.captionStrong}
  color: ${colors.ink};
`;

export const OptionDescription = styled.span`
  ${typography.finePrint}
  color: ${colors.inkMuted48};
`;
