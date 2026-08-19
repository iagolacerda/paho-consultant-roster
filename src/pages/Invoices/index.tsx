import React, { useRef } from 'react';
import { Page, Content, PageHeader, PageTitle, PageSubtitle } from '../../components/PageShell';
import { Button } from '../../components/Buttons';
import { Tabs } from '../../components/Tabs';
import { Dialog } from '../../components/Dialog';
import { FeedbackModal } from '../../components/FeedbackModal';
import { useModal } from '../../hooks/useModal';
import { useInvoices } from './useInvoices';
import { InvoiceTable } from './InvoiceTable';
import { HeaderRow, ReasonInput } from './styles';
import type { Invoice } from '../../types/invoice';

const TABS = [
  { label: 'Faturas', path: '/faturas' },
  { label: 'Vendas', path: '/vendas' },
];

export function Invoices() {
  const { invoices, isLoading, error, pagination, cancelInvoice, goToSales, goToCreateInvoice } = useInvoices();

  const confirmModal = useModal();
  const feedbackModal = useModal();
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  const showFeedback = (type: 'success' | 'error', title: string, message: string) => {
    confirmModal.close();
    feedbackModal.open(
      <FeedbackModal type={type} title={title} message={message} onClose={feedbackModal.close} />,
    );
  };

  const handleCancel = async (inv: Invoice) => {
    try {
      await cancelInvoice(inv.id, reasonRef.current?.value || undefined);
      showFeedback('success', 'Fatura cancelada com sucesso.', `A fatura ${inv.id} foi cancelada.`);
    } catch (err: any) {
      showFeedback('error', 'Erro ao cancelar fatura', err?.response?.data?.error?.message ?? 'Não foi possível cancelar a fatura.');
    }
  };

  const openConfirm = (inv: Invoice, e: React.MouseEvent) => {
    e.stopPropagation();
    confirmModal.open(
      <Dialog
        title="Cancelar fatura"
        confirmLabel="Confirmar cancelamento"
        loadingLabel="Cancelando…"
        confirmVariant="danger"
        onConfirm={() => handleCancel(inv)}
        onClose={confirmModal.close}
        message={
          <>
            Tem certeza que deseja cancelar a fatura <strong>{inv.id}</strong>?
            As vendas vinculadas voltarão para o status <strong>Confirmada</strong>.
          </>
        }
      >
        <ReasonInput ref={reasonRef} defaultValue="" placeholder="Motivo do cancelamento (opcional)" />
      </Dialog>,
    );
  };

  return (
    <Page>
      <Content>
        <PageHeader>
          <HeaderRow>
            <div>
              <PageTitle>Faturas</PageTitle>
              <PageSubtitle>Clique em uma fatura para ver as vendas vinculadas.</PageSubtitle>
            </div>
            <Button $variant="primary" onClick={goToCreateInvoice}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
              Criar Fatura
            </Button>
          </HeaderRow>
        </PageHeader>

        <Tabs tabs={TABS} />

        <InvoiceTable
          invoices={invoices}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          onRowClick={(inv) => goToSales(inv.id)}
          onCancelClick={openConfirm}
        />
      </Content>

      {confirmModal.portal}
      {feedbackModal.portal}
    </Page>
  );
}
