import styled from 'styled-components';
import { colors, spacing } from '../../styles/tokens';

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.lg};
`;

export const invoiceStatusMap: Record<string, { bg: string; color: string }> = {
  Pendente:   { bg: '#fff3cd', color: '#856404' },
  Pago:       { bg: '#d1fae5', color: '#065f46' },
  Cancelado:  { bg: '#fee2e2', color: '#991b1b' },
};

export const invoiceStatusLabel: Record<string, string> = {
  PENDING:   'Pendente',
  PAID:      'Pago',
  CANCELLED: 'Cancelado',
};

export const primaryIdStyle = { color: colors.primary, fontWeight: 600 } as const;

export const ReasonInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  border: 1px solid ${colors.hairline};
  border-radius: 8px;
  resize: vertical;
  font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
  font-size: 15px;
  color: ${colors.ink};
  background: ${colors.canvas};
  box-sizing: border-box;

  &::placeholder { color: ${colors.inkMuted48}; }
  &:focus { outline: none; border-color: ${colors.primary}; }
`;
