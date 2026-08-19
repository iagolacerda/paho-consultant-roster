import React from 'react';
import { Page, Content, PageHeader, PageTitle, PageSubtitle, TitleRow } from '../../components/PageShell';
import { BackButton, Button } from '../../components/Buttons';
import { Filters } from '../../components/Filters';
import { Modal } from '../../components/Modal';
import { Dialog } from '../../components/Dialog';
import { useModal } from '../../hooks/useModal';
import { useSales } from './useSales';
import { SaleTable } from './SaleTable';
import { toolbarStyle } from './styles';

const STATUS_OPTIONS = Object.entries({
  CONFIRMED: 'Confirmada',
  INVOICED: 'Faturada',
  CANCELLED: 'Cancelada',
  REFUNDED: 'Crédito em aberto',
}).map(([value, label]) => ({ value, label }));

export function Sales() {
  const { invoiceId, invoiceClient, isLoading, error, applied, results, search, clear, cancelInvoice, pagination, goBack, goToDetail } = useSales();
  const filterModal = useModal();
  const cancelModal = useModal();

  return (
    <Page>
      <Content>
        <PageHeader>
          <TitleRow>
            <BackButton onClick={goBack} aria-label="Voltar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </BackButton>
            <div>
              <PageTitle>Vendas — {invoiceId}</PageTitle>
              <PageSubtitle>Cliente: {invoiceClient}</PageSubtitle>
            </div>
          </TitleRow>
        </PageHeader>

        <div style={toolbarStyle}>
          <Button
            $variant="danger"
            onClick={() => cancelModal.open(
              <Dialog
                title="Cancelar fatura"
                confirmLabel="Confirmar cancelamento"
                loadingLabel="Cancelando…"
                confirmVariant="danger"
                onConfirm={cancelInvoice}
                onClose={cancelModal.close}
                message={
                  <>
                    Tem certeza que deseja cancelar a fatura <strong>{invoiceId}</strong>? As vendas vinculadas voltarão a ficar em aberto.
                  </>
                }
              />,
            )}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Cancelar fatura
          </Button>

          <Button
            $variant="ghost"
            onClick={() => filterModal.open(
              <Modal title="Filtros" onClose={filterModal.close}>
                <Filters
                  defaultValues={applied}
                  onSearch={(values) => { search(values); filterModal.close(); }}
                  onClear={clear}
                  status={{ options: STATUS_OPTIONS }}
                />
              </Modal>,
            )}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3.5h12L9.5 9v3.5L6.5 14V9L2 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Filtros
          </Button>
        </div>

        <SaleTable
          sales={results}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          onRowClick={goToDetail}
        />
      </Content>

      {filterModal.portal}
      {cancelModal.portal}
    </Page>
  );
}
