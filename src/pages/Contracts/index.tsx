// React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import { Badge } from '../../components/Badge';
import { CountryFlag } from '../../components/CountryFlag';
import { ResultsCard, Table, Th, Td, Tr, MobileList } from '../../components/DataTable';
import { ContractIcon, DownloadIcon } from '../../components/icons';
import { Page, Content, PageHeading } from '../../components/PageShell';
import { Pagination } from '../../components/Pagination';
import { isoCodeByName } from '../../data/paho/countryFlags';
import { MOCK_CONTRACTS, CONTRACT_STATUS_STYLES } from '../../data/paho/mockContracts';
import { useTranslation } from '../../i18n';
import { formatDate } from '../../utils/date';
import { downloadMockFile } from '../../utils/mockDownload';
// Local
import { ManageMenu } from './components';
import {
  ActionsCell,
  IconButton,
  MobileCard,
  MobileCardHeader,
  MobileCardTitle,
  MobileCardMeta,
  MobileCardActions,
} from './styles';

const PAGE_SIZE = 6;

export function Contracts() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const statusLabel = (status: 'active' | 'inactive') =>
    status === 'active' ? t('contracts.statusActive') : t('contracts.statusInactive');

  const handleDownload = (reference: string, title: string) => {
    downloadMockFile(
      `${reference}.txt`,
      `${reference}\n${title}\n\n${t('contracts.download')} — ${t('contracts.title')}`,
    );
  };

  const totalPages = Math.max(1, Math.ceil(MOCK_CONTRACTS.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageContracts = MOCK_CONTRACTS.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <Page>
      <Content>
        <PageHeading icon={<ContractIcon />} title={t('contracts.title')} subtitle={t('contracts.subtitle')} />

        <ResultsCard>
          <Table>
            <thead>
              <tr>
                <Th>{t('contracts.columnContract')}</Th>
                <Th style={{ width: 110 }}>{t('contracts.columnCountry')}</Th>
                <Th style={{ width: 170 }}>{t('contracts.columnSector')}</Th>
                <Th style={{ width: 130 }}>{t('contracts.columnStatus')}</Th>
                <Th style={{ width: 110 }}>{t('contracts.columnEndDate')}</Th>
                <Th style={{ width: 100 }} aria-hidden />
              </tr>
            </thead>
            <tbody>
              {pageContracts.map((contract) => (
                <Tr
                  key={contract.id}
                  $clickable={Boolean(contract.opportunityId)}
                  onClick={() => contract.opportunityId && navigate(`/oportunidades/${contract.opportunityId}`)}
                >
                  <Td>
                    <strong>{contract.title}</strong>
                    <div style={{ fontSize: 12, color: '#7a7a7a', marginTop: 2 }}>{contract.reference}</div>
                  </Td>
                  <Td style={{ whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <CountryFlag code={isoCodeByName(contract.country)} label={contract.country} />
                      {contract.country}
                    </span>
                  </Td>
                  <Td style={{ whiteSpace: 'nowrap' }}>{contract.counterpartSector}</Td>
                  <Td>
                    <Badge label={statusLabel(contract.status)} statusMap={{ [statusLabel(contract.status)]: CONTRACT_STATUS_STYLES[contract.status] }} />
                  </Td>
                  <Td style={{ whiteSpace: 'nowrap' }}>{formatDate(contract.endDate, language)}</Td>
                  <Td>
                    <ActionsCell>
                      <IconButton
                        type="button"
                        aria-label={t('contracts.download')}
                        onClick={(e) => { e.stopPropagation(); handleDownload(contract.reference, contract.title); }}
                      >
                        <DownloadIcon />
                      </IconButton>
                      <ManageMenu contract={contract} />
                    </ActionsCell>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>

          <MobileList>
            {pageContracts.map((contract) => (
              <MobileCard
                key={contract.id}
                $clickable={Boolean(contract.opportunityId)}
                onClick={() => contract.opportunityId && navigate(`/oportunidades/${contract.opportunityId}`)}
              >
                <MobileCardHeader>
                  <MobileCardTitle>{contract.title}</MobileCardTitle>
                  <Badge label={statusLabel(contract.status)} statusMap={{ [statusLabel(contract.status)]: CONTRACT_STATUS_STYLES[contract.status] }} />
                </MobileCardHeader>
                <MobileCardMeta style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CountryFlag code={isoCodeByName(contract.country)} label={contract.country} size={14} />
                  {contract.country} · {contract.counterpartSector} · {t('contracts.columnEndDate')}: {formatDate(contract.endDate, language)}
                </MobileCardMeta>
                <MobileCardActions>
                  <IconButton
                    type="button"
                    aria-label={t('contracts.download')}
                    onClick={(e) => { e.stopPropagation(); handleDownload(contract.reference, contract.title); }}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <ManageMenu contract={contract} />
                </MobileCardActions>
              </MobileCard>
            ))}
          </MobileList>

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            total={MOCK_CONTRACTS.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </ResultsCard>
      </Content>
    </Page>
  );
}
