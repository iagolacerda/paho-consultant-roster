import { mockInvoices, mockSales, delay } from './mockData';
import type {
  CancelInvoiceInput,
  CreateInvoiceInput,
  Invoice,
  ListInvoicesParams,
  ListInvoicesResponse,
} from '../types/invoice';

function matches(invoice: Invoice, params: ListInvoicesParams): boolean {
  if (params.id && invoice.id !== params.id) return false;
  if (params.clientId && invoice.client.id !== params.clientId) return false;
  if (params.from && invoice.period.to < params.from) return false;
  if (params.to && invoice.period.from > params.to) return false;
  return true;
}

let nextInvoiceSeq = mockInvoices.length + 1;

export const invoicesService = {
  list(params: ListInvoicesParams = {}): Promise<ListInvoicesResponse> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const filtered = mockInvoices.filter((inv) => matches(inv, params));
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return delay({ items, page, pageSize, total: filtered.length });
  },

  create(input: CreateInvoiceInput): Promise<Invoice> {
    const eligible = mockSales.filter(
      (s) =>
        s.client.id === input.clientId &&
        s.status === 'CONFIRMED' &&
        !s.invoiceId &&
        s.createdAt >= input.from &&
        s.createdAt <= input.to,
    );

    const client = eligible[0]?.client ?? { id: input.clientId, name: input.clientId };
    const id = `fat-${String(nextInvoiceSeq++).padStart(3, '0')}`;
    const dates = eligible.map((s) => s.createdAt).sort();

    eligible.forEach((s) => { s.status = 'INVOICED'; s.invoiceId = id; });

    const invoice: Invoice = {
      id,
      client,
      period: { from: input.from, to: input.to },
      total: eligible.reduce((acc, s) => acc + s.price.total, 0),
      saleIds: eligible.map((s) => s.id),
      salesCount: eligible.length,
      status: 'PENDING',
      createdAt: dates[dates.length - 1] ?? input.to,
      cancelledAt: null,
      cancellationReason: null,
    };

    mockInvoices.unshift(invoice);
    return delay(invoice);
  },

  cancel(input: CancelInvoiceInput): Promise<Invoice> {
    const invoice = mockInvoices.find((inv) => inv.id === input.id);
    if (!invoice) return Promise.reject(new Error('Fatura não encontrada'));

    invoice.status = 'CANCELLED';
    invoice.cancelledAt = new Date().toISOString();
    invoice.cancellationReason = input.reason ?? null;

    mockSales
      .filter((s) => s.invoiceId === invoice.id)
      .forEach((s) => { s.status = 'CONFIRMED'; s.invoiceId = null; });

    return delay(invoice);
  },
};
