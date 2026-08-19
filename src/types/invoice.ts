export interface InvoiceClientRef {
  id: string;
  name: string;
}

export interface InvoicePeriod {
  from: string;
  to: string;
}

export type InvoiceStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export interface Invoice {
  id: string;
  client: InvoiceClientRef;
  period: InvoicePeriod;
  total: number;
  saleIds: string[];
  salesCount: number;
  status: InvoiceStatus;
  createdAt: string;
  cancelledAt: string | null;
  cancellationReason: string | null;
}

// ─── Cancel Invoice ───────────────────────────────────────────────────────────

export interface CancelInvoiceInput {
  id: string;
  reason?: string;
}

// ─── Create Invoice ───────────────────────────────────────────────────────────

export interface CreateInvoiceInput {
  clientId: string;
  from: string;
  to: string;
}

// ─── List Invoices ────────────────────────────────────────────────────────────

export interface ListInvoicesParams {
  id?: string;
  from?: string;
  to?: string;
  clientId?: string;
  page?: number;
  pageSize?: number;
}

export interface ListInvoicesResponse {
  items: Invoice[];
  page: number;
  pageSize: number;
  total: number;
}
