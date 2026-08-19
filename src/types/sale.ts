export type SaleStatus = 'CONFIRMED' | 'CANCELLED' | 'INVOICED' | 'REFUNDED';
export type SaleModal = 'HOTEL' | 'FLIGHT' | 'CAR' | 'OTHER';
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'BANK_TRANSFER' | 'PIX';

export interface SaleRef {
  id: string;
  name: string;
}

export interface CostCenter {
  code: string;
  name: string;
}

export interface SupplierRef {
  code: string;
  name: string;
}

export interface InvoiceItem {
  [key: string]: unknown;
}

export interface SaleInvoiceDetail {
  items: InvoiceItem[];
  description: string;
}

export interface Sale {
  id: string;
  code: string;
  correlationId: string;
  client: SaleRef;
  modal: SaleModal;
  traveller: SaleRef;
  costCenter: CostCenter;
  price: { total: number };
  supplier: SupplierRef;
  provider: SupplierRef;
  paymentMethod: PaymentMethod;
  invoice: SaleInvoiceDetail;
  status: SaleStatus;
  erp: Record<string, unknown>;
  invoiceId: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
  cancelledAt: string | null;
}

// ─── List Sales ───────────────────────────────────────────────────────────────

export interface ListSalesParams {
  id?: string;
  from?: string;
  to?: string;
  clientId?: string;
  travellerId?: string;
  status?: SaleStatus;
  code?: string;
  invoiceId?: string | null;
  page?: number;
  pageSize?: number;
}

export interface ListSalesResponse {
  items: Sale[];
  page: number;
  pageSize: number;
  total: number;
}
