import React from 'react';
import { Page, Content, PageHeader, PageTitle, PageSubtitle } from '../../components/PageShell';
import { Button } from '../../components/Buttons';
import { Filters } from '../../components/Filters';
import { Modal } from '../../components/Modal';
import { Tabs } from '../../components/Tabs';
import { useModal } from '../../hooks/useModal';
import { useAllSales } from './useAllSales';
import { AllSaleTable } from './AllSaleTable';
import { HeaderRow, FilterBar } from './styles';

const TABS = [
  { label: 'Faturas', path: '/faturas' },
  { label: 'Vendas', path: '/vendas' },
];

const STATUS_OPTIONS = [
  { value: 'CONFIRMED', label: 'Confirmada' },
  { value: 'INVOICED', label: 'Faturada' },
  { value: 'CANCELLED', label: 'Cancelada' },
  { value: 'REFUNDED', label: 'Crédito em aberto' },
];

export function AllSales() {
  const { isLoading, error, applied, results, search, clear, pagination, goToDetail } = useAllSales();
  const filterModal = useModal();

  return (
    <Page>
      <Content>
        <PageHeader>
          <HeaderRow>
            <div>
              <PageTitle>Vendas</PageTitle>
              <PageSubtitle>Clique em uma venda para ver os detalhes.</PageSubtitle>
            </div>
          </HeaderRow>
        </PageHeader>

        <Tabs tabs={TABS} />

        <FilterBar>
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
        </FilterBar>

        <AllSaleTable
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
