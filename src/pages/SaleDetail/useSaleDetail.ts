import { useParams } from 'react-router-dom';
import { salesService } from '../../services/salesService';
import { useAsync } from '../../hooks/useAsync';

export function useSaleDetail() {
  const { saleId } = useParams<{ saleId: string }>();

  const { data, isLoading, error } = useAsync(
    () => salesService.list({ id: saleId, pageSize: 1 }),
    [saleId],
  );

  const sale = data?.items?.[0] ?? null;

  return { sale, isLoading, error, saleId };
}
