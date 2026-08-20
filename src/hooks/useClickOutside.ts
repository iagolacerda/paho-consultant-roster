// React
import { useEffect, RefObject } from 'react';

// Fecha um dropdown/menu ao clicar fora dele — usado por UserMenu e pelo
// menu "Gerenciar" da tela de contratações.
export function useClickOutside(ref: RefObject<HTMLElement | null>, onOutside: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [active, ref, onOutside]);
}
