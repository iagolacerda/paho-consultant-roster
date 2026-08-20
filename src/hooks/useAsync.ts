// React
import { useState, useEffect, useCallback, useRef } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface State<T> {
  data: T | null;
  status: Status;
  error: string | null;
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<State<T>>({ data: null, status: 'idle', error: null });
  const mountedRef = useRef(true);

  const run = useCallback(() => {
    setState((s) => ({ ...s, status: 'loading', error: null }));
    fn()
      .then((data) => {
        if (mountedRef.current) setState({ data, status: 'success', error: null });
      })
      .catch((err) => {
        if (mountedRef.current)
          setState({ data: null, status: 'error', error: err?.response?.data?.message ?? err.message ?? 'Erro inesperado' });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    run();
    return () => { mountedRef.current = false; };
  }, [run]);

  return { ...state, isLoading: state.status === 'loading', reload: run };
}
