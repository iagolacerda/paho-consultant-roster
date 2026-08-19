import React from 'react';
import { Page, Content, PageHeader, PageTitle, PageSubtitle, TitleRow } from '../../components/PageShell';
import { BackButton, Button } from '../../components/Buttons';
import { Filters } from '../../components/Filters';
import { Modal } from '../../components/Modal';
import { useModal } from '../../hooks/useModal';
import { useCreateInvoice } from './useCreateInvoice';
import { FreeSaleTable } from './FreeSaleTable';
import { filterBarStyle } from './styles';

export function CreateInvoice() {
  const { isLoading, error, applied, results, search, clear, pagination, goBack, goToDetail } = useCreateInvoice();
  const filterModal = useModal();

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
              <PageTitle>Nova Fatura</PageTitle>
              <PageSubtitle>Vendas confirmadas ainda não vinculadas a nenhuma fatura.</PageSubtitle>
            </div>
          </TitleRow>
        </PageHeader>

        <div style={filterBarStyle}>
          <Button
            $variant="ghost"
            onClick={() => filterModal.open(
              <Modal title="Filtros" onClose={filterModal.close}>
                <Filters
                  defaultValues={applied}
                  onSearch={(values) => { search(values); filterModal.close(); }}
                  onClear={clear}
                  status={{ locked: 'Em aberto' }}
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

        <FreeSaleTable
          sales={results}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          onRowClick={goToDetail}
        />
      </Content>

      {filterModal.portal}
    </Page>
  );
}
