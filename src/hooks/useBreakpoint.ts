import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../styles/tokens';

// Mesmos breakpoints usados nos `@media` do styled-components
// (src/styles/tokens.ts) — para o raro caso em que a decisão precisa
// acontecer em JS (não só esconder/mostrar via CSS).
export function useBreakpoint() {
  const isXs = useMediaQuery({ maxWidth: breakpoints.xs });
  const isSm = useMediaQuery({ maxWidth: breakpoints.sm });
  const isMd = useMediaQuery({ maxWidth: breakpoints.md });
  const isLg = useMediaQuery({ maxWidth: breakpoints.lg });

  return { isXs, isSm, isMd, isLg };
}
