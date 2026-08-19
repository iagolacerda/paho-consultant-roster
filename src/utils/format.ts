export function formatCurrency(valueInReais: number): string {
  return valueInReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatCurrencyFromCents(valueInCents: number): string {
  return formatCurrency(valueInCents / 100);
}

export function formatDate(isoDate: string): string {
  const normalized = isoDate.includes('T') ? isoDate : isoDate + 'T00:00:00';
  return new Date(normalized).toLocaleDateString('pt-BR');
}
