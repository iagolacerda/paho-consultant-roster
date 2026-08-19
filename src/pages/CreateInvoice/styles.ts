import { colors } from '../../styles/tokens';

export const primaryIdStyle = { color: colors.primary, fontWeight: 600 } as const;

export const filterBarStyle = { display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' } as const;

export const freeSaleStatusMap: Record<string, { bg: string; color: string }> = {
  'Em aberto': { bg: '#e0f2fe', color: '#0369a1' },
};
