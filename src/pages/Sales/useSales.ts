import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EMPTY_FILTERS, FilterValues } from '../../components/Filters';
import { salesService } from '../../services/salesService';
import { invoicesService } from '../../services/invoicesService';
import { useAsync } from '../../hooks/useAsync';
import type { SaleStatus } from '../../types/sale';

const PAGE_SIZE = 20;

export function useSales() {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [applied, setApplied] = useState<FilterValues>(EMPTY_FILTERS);

  const search = (values: FilterValues) => { setApplied(values); setPage(1); };
  const clear = () => { setApplied(EMPTY_FILTERS); setPage(1); };

  const cancelInvoice = async () => {
    if (!invoiceId) return;
    await invoicesService.cancel({ id: invoiceId });
    navigate('/faturas');
  };

  const { data, isLoading, error } = useAsync(
    () => salesService.list({
      invoiceId: invoiceId ?? '',
      status: (applied.status as SaleStatus) || undefined,
      from: applied.dateFrom || undefined,
      to: applied.dateTo || undefined,
      page,
      pageSize: PAGE_SIZE,
    }),
    [invoiceId, applied.status, applied.dateFrom, applied.dateTo, page],
  );

  const allItems = data?.items ?? [];
  const invoiceClient = allItems[0]?.client.name ?? '';

  const results = allItems.filter((s) => {
    if (applied.traveller && !s.traveller.name.toLowerCase().includes(applied.traveller.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);

  return {
    invoiceId: invoiceId ?? '',
    invoiceClient,
    isLoading,
    error,
    applied,
    results,
    search,
    clear,
    cancelInvoice,
    pagination: { page, totalPages, total: data?.total ?? 0, pageSize: PAGE_SIZE, setPage },
    goBack: () => navigate('/faturas'),
    goToDetail: (saleId: string) => navigate(`/vendas/${saleId}`),
  };
}
