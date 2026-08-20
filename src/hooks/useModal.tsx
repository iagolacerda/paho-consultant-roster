// React
import { useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export function useModal() {
  const [content, setContent] = useState<ReactNode>(null);

  const open = useCallback((node: ReactNode) => setContent(node), []);
  const close = useCallback(() => setContent(null), []);

  const isOpen = content !== null;
  const portal = isOpen ? createPortal(content, document.body) : null;

  return { isOpen, open, close, portal };
}
