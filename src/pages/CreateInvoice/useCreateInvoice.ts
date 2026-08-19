import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMPTY_FILTERS, FilterValues } from '../../components/Filters';
import { salesService } from '../../services/salesService';
import { useAsync } from '../../hooks/useAsync';

const PAGE_SIZE = 20;

export function useCreateInvoice() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [applied, setApplied] = useState<FilterValues>(EMPTY_FILTERS);

  const search = (values: FilterValues) => { setApplied(values); setPage(1); };
  const clear = () => { setApplied(EMPTY_FILTERS); setPage(1); };

  const { data, isLoading, error } = useAsync(
    () => salesService.list({
      status: 'CONFIRMED',
      invoiceId: null,
      from: applied.dateFrom || undefined,
      to: applied.dateTo || undefined,
      page,
      pageSize: PAGE_SIZE,
    }),
    [applied.dateFrom, applied.dateTo, page],
  );

  const allItems = data?.items ?? [];

  const results = allItems.filter((s) => {
    if (applied.client && !s.client.name.toLowerCase().includes(applied.client.toLowerCase())) return false;
    if (applied.traveller && !s.traveller.name.toLowerCase().includes(applied.traveller.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);

  return {
    isLoading,
    error,
    applied,
    results,
    search,
    clear,
    pagination: { page, totalPages, total: data?.total ?? 0, pageSize: PAGE_SIZE, setPage },
    goBack: () => navigate('/faturas'),
    goToDetail: (saleId: string) => navigate(`/vendas/${saleId}`),
  };
}
