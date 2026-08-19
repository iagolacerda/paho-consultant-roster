import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoicesService } from '../../services/invoicesService';
import { useAsync } from '../../hooks/useAsync';

const PAGE_SIZE = 20;

export function useInvoices() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, isLoading, error } = useAsync(
    () => invoicesService.list({ page, pageSize: PAGE_SIZE }),
    [page, refreshKey],
  );

  const cancelInvoice = useCallback(async (id: string, reason?: string) => {
    await invoicesService.cancel({ id, reason });
    setRefreshKey((k) => k + 1);
  }, []);

  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);

  return {
    invoices: data?.items ?? [],
    isLoading,
    error,
    pagination: { page, totalPages, total: data?.total ?? 0, pageSize: PAGE_SIZE, setPage },
    cancelInvoice,
    goToSales: (invoiceId: string) => navigate(`/faturas/${invoiceId}/vendas`),
    goToCreateInvoice: () => navigate('/faturas/criar-fatura'),
  };
}
