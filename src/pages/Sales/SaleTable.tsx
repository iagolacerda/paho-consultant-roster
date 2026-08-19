import React from 'react';
import { ResultsCard, ResultsHeader, ResultsTitle, ResultsCount, Table, Th, Td, Tr, EmptyState, SkeletonRow } from '../../components/DataTable';
import { Badge } from '../../components/Badge';
import { Pagination } from '../../components/Pagination';
import { primaryIdStyle, saleStatusMap, saleStatusLabel } from './styles';
import { formatDate, formatCurrencyFromCents } from '../../utils/format';
import type { Sale } from '../../types/sale';

interface PaginationState {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  setPage: (p: number) => void;
}

interface SaleTableProps {
  sales: Sale[];
  isLoading: boolean;
  error: string | null;
  pagination: PaginationState;
  onRowClick?: (id: string) => void;
}

export function SaleTable({ sales, isLoading, error, pagination, onRowClick }: SaleTableProps) {
  return (
    <ResultsCard>
      <ResultsHeader>
        <ResultsTitle>Vendas vinculadas</ResultsTitle>
        <ResultsCount>{pagination.total} {pagination.total === 1 ? 'venda' : 'vendas'}</ResultsCount>
      </ResultsHeader>

      <Table>
        <thead>
          <tr>
            <Th>Código</Th>
            <Th>Passageiro</Th>
            <Th>Serviços</Th>
            <Th>Data</Th>
            <Th>Total</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 8 }, (_, i) => <SkeletonRow key={i} columns={6} />)
          ) : error ? (
            <tr><td colSpan={6}><EmptyState>{error}</EmptyState></td></tr>
          ) : sales.length === 0 ? (
            <tr><td colSpan={6}><EmptyState>Nenhuma venda encontrada com os filtros aplicados.</EmptyState></td></tr>
          ) : (
            sales.map((s) => (
              <Tr key={s.id} style={onRowClick ? { cursor: 'pointer' } : undefined} onClick={() => onRowClick?.(s.id)}>
                <Td style={primaryIdStyle}>{s.code}</Td>
                <Td>{s.traveller.name}</Td>
                <Td><Badge label={s.modal} /></Td>
                <Td>{formatDate(s.createdAt)}</Td>
                <Td style={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrencyFromCents(s.price.total)}</Td>
                <Td><Badge label={saleStatusLabel[s.status] ?? s.status} statusMap={saleStatusMap} /></Td>
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
