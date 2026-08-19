import { colors } from '../../styles/tokens';

export const saleStatusMap: Record<string, { bg: string; color: string }> = {
  Confirmada:          { bg: '#d1fae5', color: '#065f46' },
  Faturada:            { bg: '#dbeafe', color: '#1e40af' },
  Cancelada:           { bg: '#fee2e2', color: '#991b1b' },
  'Crédito em aberto': { bg: '#e0f2fe', color: '#0369a1' },
};

export const saleStatusLabel: Record<string, string> = {
  CONFIRMED: 'Confirmada',
  INVOICED:  'Faturada',
  CANCELLED: 'Cancelada',
  REFUNDED:  'Crédito em aberto',
};

export const primaryIdStyle = { color: colors.primary, fontWeight: 600 } as const;

export const toolbarStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' } as const;
