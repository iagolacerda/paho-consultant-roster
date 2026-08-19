import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Content, PageHeader, PageTitle, PageSubtitle } from '../../components/PageShell';
import { BackButton } from '../../components/Buttons';
import { Badge } from '../../components/Badge';
import { saleStatusMap, saleStatusLabel } from '../Sales/styles';
import { formatDate, formatCurrencyFromCents } from '../../utils/format';
import { useSaleDetail } from './useSaleDetail';
import {
  DetailCard, SectionTitle, FieldGrid, FieldItem, FieldLabel, FieldValue,
  InvoiceLink, SkeletonBlock,
} from './styles';
import { TitleRow } from '../../components/PageShell';

export function SaleDetail() {
  const navigate = useNavigate();
  const { sale, isLoading, error } = useSaleDetail();

  return (
    <Page>
      <Content>
        <PageHeader>
          <TitleRow>
            <BackButton onClick={() => navigate('/vendas')} aria-label="Voltar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </BackButton>
            <div>
              <PageTitle>{sale?.code ?? 'Detalhe da venda'}</PageTitle>
              {sale && <PageSubtitle>{sale.client.name}</PageSubtitle>}
            </div>
          </TitleRow>
        </PageHeader>

        {isLoading && <SkeletonBlock />}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!isLoading && !error && !sale && <p>Venda não encontrada.</p>}

        {sale && (
          <>
            <DetailCard>
              <SectionTitle>Informações gerais</SectionTitle>
              <FieldGrid>
                <FieldItem>
                  <FieldLabel>Código</FieldLabel>
                  <FieldValue>{sale.code}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Comprovante</FieldLabel>
                  <FieldValue>
                    <InvoiceLink
                      href={`https://pr-2.bff.banking-platform.preview.develop.govoll.com/receipt/?paymentId=${sale.correlationId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir comprovante ↗
                    </InvoiceLink>
                  </FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Status</FieldLabel>
                  <FieldValue>
                    <Badge label={saleStatusLabel[sale.status] ?? sale.status} statusMap={saleStatusMap} />
                  </FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Serviço</FieldLabel>
                  <FieldValue><Badge label={sale.modal} /></FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Total</FieldLabel>
                  <FieldValue>{formatCurrencyFromCents(sale.price.total)}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Data de criação</FieldLabel>
                  <FieldValue>{formatDate(sale.createdAt)}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Última atualização</FieldLabel>
                  <FieldValue>{formatDate(sale.updatedAt)}</FieldValue>
                </FieldItem>
                {sale.cancellationReason && (
                  <FieldItem>
                    <FieldLabel>Motivo do cancelamento</FieldLabel>
                    <FieldValue>{sale.cancellationReason}</FieldValue>
                  </FieldItem>
                )}
              </FieldGrid>
            </DetailCard>

            <DetailCard>
              <SectionTitle>Partes envolvidas</SectionTitle>
              <FieldGrid>
                <FieldItem>
                  <FieldLabel>Cliente</FieldLabel>
                  <FieldValue>{sale.client.name}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Passageiro</FieldLabel>
                  <FieldValue>{sale.traveller.name}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Fornecedor</FieldLabel>
                  <FieldValue>{sale.supplier.name}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Provedor</FieldLabel>
                  <FieldValue>{sale.provider.name}</FieldValue>
                </FieldItem>
                {sale.costCenter && (
                  <FieldItem>
                    <FieldLabel>Centro de custo</FieldLabel>
                    <FieldValue>{sale.costCenter.name}</FieldValue>
                  </FieldItem>
                )}
              </FieldGrid>
            </DetailCard>

            <DetailCard>
              <SectionTitle>Fatura vinculada</SectionTitle>
              <FieldGrid>
                <FieldItem>
                  <FieldLabel>Fatura</FieldLabel>
                  <FieldValue>
                    {sale.invoiceId ? (
                      <InvoiceLink
                        href="#"
                        onClick={(e) => { e.preventDefault(); navigate(`/faturas`); }}
                      >
                        {sale.invoiceId}
                      </InvoiceLink>
                    ) : (
                      <span style={{ color: '#7a7a7a' }}>Sem fatura vinculada</span>
                    )}
                  </FieldValue>
                </FieldItem>
              </FieldGrid>
            </DetailCard>
          </>
        )}
      </Content>
    </Page>
  );
}
