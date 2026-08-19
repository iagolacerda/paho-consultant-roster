import React from 'react';
import { ResultsCard, ResultsHeader, ResultsTitle, ResultsCount, Table, Th, Td, Tr, ChevronTd, EmptyState, SkeletonRow } from '../../components/DataTable';
import { Badge } from '../../components/Badge';
import { Pagination } from '../../components/Pagination';
import { primaryIdStyle, invoiceStatusMap, invoiceStatusLabel } from './styles';
import { formatDate, formatCurrencyFromCents } from '../../utils/format';
import type { Invoice } from '../../types/invoice';

interface PaginationState {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  setPage: (p: number) => void;
}

interface InvoiceTableProps {
  invoices: Invoice[];
  isLoading: boolean;
  error: string | null;
  pagination: PaginationState;
  onRowClick: (inv: Invoice) => void;
  onCancelClick: (inv: Invoice, e: React.MouseEvent) => void;
}

export function InvoiceTable({ invoices, isLoading, error, pagination, onRowClick, onCancelClick }: InvoiceTableProps) {
  return (
    <ResultsCard>
      <ResultsHeader>
        <ResultsTitle>Todas as faturas</ResultsTitle>
        <ResultsCount>{pagination.total} {pagination.total === 1 ? 'fatura' : 'faturas'}</ResultsCount>
      </ResultsHeader>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Cliente</Th>
            <Th>Período</Th>
            <Th>Qtd. Vendas</Th>
            <Th>Total</Th>
            <Th>Status</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 8 }, (_, i) => <SkeletonRow key={i} columns={7} />)
          ) : error ? (
            <tr><td colSpan={7}><EmptyState>{error}</EmptyState></td></tr>
          ) : invoices.length === 0 ? (
            <tr><td colSpan={7}><EmptyState>Nenhuma fatura encontrada.</EmptyState></td></tr>
          ) : (
            invoices.map((inv) => (
              <Tr key={inv.id} $clickable onClick={() => onRowClick(inv)}>
                <Td style={primaryIdStyle}>{inv.id}</Td>
                <Td>{inv.client.name}</Td>
                <Td>{formatDate(inv.period.from)} – {formatDate(inv.period.to)}</Td>
                <Td>{inv.salesCount}</Td>
                <Td style={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrencyFromCents(inv.total)}</Td>
                <Td>
                  <Badge label={invoiceStatusLabel[inv.status] ?? inv.status} statusMap={invoiceStatusMap} />
                </Td>
                <Td>
                  <ChevronTd as="span">›</ChevronTd>
                </Td>
              </Tr>
            ))
          )}
        </tbody>
      </Table>

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onPageChange={pagination.setPage}
      />
    </ResultsCard>
  );
}
