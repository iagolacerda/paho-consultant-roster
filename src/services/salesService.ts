import { mockSales, delay } from './mockData';
import type { ListSalesParams, ListSalesResponse, Sale } from '../types/sale';

function matches(sale: Sale, params: ListSalesParams): boolean {
  if (params.id && sale.id !== params.id) return false;
  if (params.code && !sale.code.toLowerCase().includes(params.code.toLowerCase())) return false;
  if (params.clientId && sale.client.id !== params.clientId) return false;
  if (params.travellerId && sale.traveller.id !== params.travellerId) return false;
  if (params.status && sale.status !== params.status) return false;
  if (params.from && sale.createdAt < params.from) return false;
  if (params.to && sale.createdAt > params.to) return false;
  if (params.invoiceId !== undefined && sale.invoiceId !== params.invoiceId) return false;
  return true;
}

export const salesService = {
  list(params: ListSalesParams = {}): Promise<ListSalesResponse> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const filtered = mockSales.filter((s) => matches(s, params));
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return delay({ items, page, pageSize, total: filtered.length });
  },
};
