// Libs
import styled, { css } from 'styled-components';
// Components
import { colors, radius, typography } from '../../../styles/tokens';

export type ButtonVariant = 'primary' | 'ghost' | 'danger';

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: ${colors.primary};
    color: ${colors.onPrimary};
    border: none;
    padding: 9px 20px;
    font-size: 14px;
    &:hover { background: ${colors.primaryFocus}; }
  `,
  ghost: css`
    background: transparent;
    color: ${colors.primary};
    border: 1px solid ${colors.primary};
    padding: 8px 19px;
    font-size: 14px;
    &:hover { background: rgba(12, 59, 94, 0.06); }
  `,
  danger: css`
    background: transparent;
    color: ${colors.danger};
    border: 1px solid ${colors.danger};
    padding: 8px 19px;
    font-size: 14px;
    &:hover { background: rgba(192, 57, 43, 0.06); }
  `,
};

export const Button = styled.button<{ $variant?: ButtonVariant }>`
  ${typography.body}
  border-radius: ${radius.pill};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: background 0.15s, transform 0.1s;
  &:active { transform: scale(0.95); }
  ${({ $variant = 'primary' }: { $variant?: ButtonVariant }) => variantStyles[$variant]}
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.pill};
  color: ${colors.ink};
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  &:hover  { background: ${colors.canvasParchment}; }
  &:active { transform: scale(0.95); }
`;
