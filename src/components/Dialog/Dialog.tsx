import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Button, ButtonVariant } from '../Buttons';
import { Body, Message, Actions, ErrorText } from './styles';

export interface DialogProps {
  onClose: () => void;
  title: string;
  message?: React.ReactNode;
  /** Conteúdo extra no corpo (ex.: campo de motivo). */
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loadingLabel?: string;
  onConfirm: () => void | Promise<void>;
  confirmVariant?: ButtonVariant;
}

export function Dialog({
  onClose,
  title,
  message,
  children,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Voltar',
  loadingLabel = 'Processando…',
  onConfirm,
  confirmVariant = 'primary',
}: DialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await onConfirm();
    } catch (err: any) {
      setError(err?.response?.data?.error?.message ?? err?.message ?? 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={title} position="center" onClose={onClose}>
      <Body>
        {message && <Message>{message}</Message>}
        {children}
        {error && <ErrorText>{error}</ErrorText>}
        <Actions>
          <Button type="button" $variant="ghost" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
          <Button type="button" $variant={confirmVariant} onClick={handleConfirm} disabled={loading}>
            {loading ? loadingLabel : confirmLabel}
          </Button>
        </Actions>
      </Body>
    </Modal>
  );
}
