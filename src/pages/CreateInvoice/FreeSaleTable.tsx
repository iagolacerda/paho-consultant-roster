import React from 'react';
import { ResultsCard, ResultsHeader, ResultsTitle, ResultsCount, Table, Th, Td, Tr, EmptyState, SkeletonRow } from '../../components/DataTable';
import { Badge } from '../../components/Badge';
import { Pagination } from '../../components/Pagination';
import { primaryIdStyle, freeSaleStatusMap } from './styles';
import { formatDate, formatCurrencyFromCents } from '../../utils/format';
import type { Sale } from '../../types/sale';

interface PaginationState {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  setPage: (p: number) => void;
}

interface FreeSaleTableProps {
  sales: Sale[];
  isLoading: boolean;
  error: string | null;
  pagination: PaginationState;
  onRowClick?: (id: string) => void;
}

export function FreeSaleTable({ sales, isLoading, error, pagination, onRowClick }: FreeSaleTableProps) {
  return (
    <ResultsCard>
      <ResultsHeader>
        <ResultsTitle>Vendas disponíveis</ResultsTitle>
        <ResultsCount>{pagination.total} {pagination.total === 1 ? 'venda' : 'vendas'}</ResultsCount>
      </ResultsHeader>

      <Table>
        <thead>
          <tr>
            <Th>Código</Th>
            <Th>Cliente</Th>
            <Th>Passageiro</Th>
            <Th>Serviços</Th>
            <Th>Data</Th>
            <Th>Valor</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 8 }, (_, i) => <SkeletonRow key={i} columns={7} />)
          ) : error ? (
            <tr><td colSpan={7}><EmptyState>{error}</EmptyState></td></tr>
          ) : sales.length === 0 ? (
            <tr><td colSpan={7}><EmptyState>Nenhuma venda disponível para faturamento.</EmptyState></td></tr>
          ) : (
            sales.map((s) => (
              <Tr key={s.id} style={onRowClick ? { cursor: 'pointer' } : undefined} onClick={() => onRowClick?.(s.id)}>
                <Td style={primaryIdStyle}>{s.code}</Td>
                <Td>{s.client.name}</Td>
                <Td>{s.traveller.name}</Td>
                <Td><Badge label={s.modal} /></Td>
                <Td>{formatDate(s.createdAt)}</Td>
                <Td style={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrencyFromCents(s.price.total)}</Td>
                <Td><Badge label="Em aberto" statusMap={freeSaleStatusMap} /></Td>
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
