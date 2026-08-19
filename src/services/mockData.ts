import type { Sale, SaleModal, PaymentMethod } from '../types/sale';
import type { Invoice } from '../types/invoice';

const CLIENTS = [
  { id: 'cli-1', name: 'Voll Turismo' },
  { id: 'cli-2', name: 'Global Trips Corp' },
  { id: 'cli-3', name: 'Andrade Viagens' },
  { id: 'cli-4', name: 'Bertoni Empresarial' },
];

const TRAVELLERS = [
  { id: 'trv-1', name: 'Ana Souza' },
  { id: 'trv-2', name: 'Bruno Lima' },
  { id: 'trv-3', name: 'Carla Menezes' },
  { id: 'trv-4', name: 'Diego Fontes' },
  { id: 'trv-5', name: 'Elisa Ramos' },
  { id: 'trv-6', name: 'Felipe Andrade' },
];

const SUPPLIERS = [
  { code: 'LATAM', name: 'LATAM Airlines' },
  { code: 'GOL', name: 'GOL Linhas Aéreas' },
  { code: 'AZUL', name: 'Azul Linhas Aéreas' },
  { code: 'BOOKING', name: 'Booking.com' },
  { code: 'LOCALIZA', name: 'Localiza Rent a Car' },
];

const COST_CENTERS = [
  { code: 'CC-100', name: 'Diretoria Comercial' },
  { code: 'CC-200', name: 'Operações' },
  { code: 'CC-300', name: 'Marketing' },
];

const MODALS: SaleModal[] = ['HOTEL', 'FLIGHT', 'CAR', 'OTHER'];
const PAYMENT_METHODS: PaymentMethod[] = ['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'PIX'];

const DAY = 24 * 60 * 60 * 1000;
const ANCHOR = new Date('2026-08-01T12:00:00Z').getTime();

function pad(n: number, len = 3): string {
  return String(n).padStart(len, '0');
}

function buildSales(): Sale[] {
  const sales: Sale[] = [];
  const total = 64;

  for (let i = 0; i < total; i++) {
    const client = CLIENTS[i % CLIENTS.length];
    const traveller = TRAVELLERS[i % TRAVELLERS.length];
    const supplier = SUPPLIERS[i % SUPPLIERS.length];
    const provider = SUPPLIERS[(i + 2) % SUPPLIERS.length];
    const modal = MODALS[i % MODALS.length];
    const costCenter = COST_CENTERS[i % COST_CENTERS.length];
    const createdAt = new Date(ANCHOR - i * DAY).toISOString();
    const isCancelled = i % 11 === 0;
    const status: Sale['status'] = isCancelled ? 'CANCELLED' : i % 5 === 0 ? 'REFUNDED' : 'CONFIRMED';

    sales.push({
      id: `sale-${pad(i + 1, 4)}`,
      code: `V-${2026000 + i}`,
      correlationId: `corr-${pad(i + 1, 4)}`,
      client,
      modal,
      traveller,
      costCenter,
      price: { total: 15000 + ((i * 733) % 480000) },
      supplier,
      provider,
      paymentMethod: PAYMENT_METHODS[i % PAYMENT_METHODS.length],
      invoice: { items: [], description: `${modal} - ${supplier.name}` },
      status,
      erp: {},
      invoiceId: null,
      cancellationReason: isCancelled ? 'Solicitação do cliente' : null,
      createdAt,
      updatedAt: createdAt,
      cancelledAt: isCancelled ? createdAt : null,
    });
  }

  return sales;
}

export const mockSales: Sale[] = buildSales();

function buildInvoices(): Invoice[] {
  const invoices: Invoice[] = [];

  for (let n = 0; n < 5; n++) {
    const client = CLIENTS[n % CLIENTS.length];
    const batch = mockSales
      .filter((s) => s.client.id === client.id && s.status === 'CONFIRMED' && !s.invoiceId)
      .slice(0, 6);
    if (batch.length === 0) continue;

    const id = `fat-${pad(n + 1)}`;
    batch.forEach((s) => { s.status = 'INVOICED'; s.invoiceId = id; });

    const dates = batch.map((s) => s.createdAt).sort();
    const isCancelled = n === 4;

    invoices.push({
      id,
      client,
      period: { from: dates[0], to: dates[dates.length - 1] },
      total: batch.reduce((acc, s) => acc + s.price.total, 0),
      saleIds: batch.map((s) => s.id),
      salesCount: batch.length,
      status: isCancelled ? 'CANCELLED' : n % 2 === 0 ? 'PAID' : 'PENDING',
      createdAt: dates[dates.length - 1],
      cancelledAt: isCancelled ? dates[dates.length - 1] : null,
      cancellationReason: isCancelled ? 'Divergência de valores' : null,
    });
  }

  return invoices;
}

export const mockInvoices: Invoice[] = buildInvoices();

const LATENCY_MS = 350;

export function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));
}
