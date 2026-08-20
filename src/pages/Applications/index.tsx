// React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import { Badge } from '../../components/Badge';
import { CountryFlag } from '../../components/CountryFlag';
import { ResultsCard, Table, Th, Td, Tr, ChevronTd, EmptyState, MobileList } from '../../components/DataTable';
import { ApplicationsIcon } from '../../components/icons';
import { ListRow, RowMain, RowTitle, RowMeta, RowChevron } from '../../components/ListRow';
import { Page, Content, PageHeading } from '../../components/PageShell';
import { Pagination } from '../../components/Pagination';
import { isoCodeByName } from '../../data/paho/countryFlags';
import { Application, APPLICATION_STATUS_STYLES } from '../../data/paho/mockApplications';
import { MOCK_OPPORTUNITIES, Opportunity } from '../../data/paho/mockOpportunities';
import { useTranslation } from '../../i18n';
import { applicationsService } from '../../services/applicationsService';

interface ApplicationRow {
  app: Application;
  opportunity: Opportunity;
}

const PAGE_SIZE = 6;

export function Applications() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const statusLabel = (status: Application['status']) => t(`applicationStatus.${status}`);
  const rows: ApplicationRow[] = [];
  applicationsService.list().forEach((app) => {
    const opportunity = MOCK_OPPORTUNITIES.find((o) => o.id === app.opportunityId);
    if (opportunity) rows.push({ app, opportunity });
  });

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <Page>
      <Content>
        <PageHeading icon={<ApplicationsIcon />} title={t('applications.title')} subtitle={t('applications.subtitle')} />

        {rows.length === 0 ? (
          <ResultsCard><EmptyState>{t('applications.empty')}</EmptyState></ResultsCard>
        ) : (
          <ResultsCard>
            <Table>
              <thead>
                <tr>
                  <Th>{t('applications.columnJob')}</Th>
                  <Th style={{ width: 110 }}>{t('applications.columnCountry')}</Th>
                  <Th style={{ width: 170 }}>{t('applications.columnSector')}</Th>
                  <Th style={{ width: 150 }}>{t('applications.columnStatus')}</Th>
                  <Th style={{ width: 40 }} aria-hidden />
                </tr>
              </thead>
              <tbody>
                {pageRows.map(({ app, opportunity }) => (
                  <Tr key={app.opportunityId} $clickable onClick={() => navigate(`/oportunidades/${opportunity.id}`)}>
                    <Td>
                      <strong>{opportunity.title}</strong>
                      <div style={{ fontSize: 12, color: '#7a7a7a', marginTop: 2 }}>{opportunity.reference}</div>
                    </Td>
                    <Td style={{ whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <CountryFlag code={isoCodeByName(opportunity.country)} label={opportunity.country} />
                        {opportunity.country}
                      </span>
                    </Td>
                    <Td style={{ whiteSpace: 'nowrap' }}>{opportunity.counterpartSector}</Td>
                    <Td>
                      <Badge
                        label={statusLabel(app.status)}
                        statusMap={{ [statusLabel(app.status)]: APPLICATION_STATUS_STYLES[app.status] }}
                      />
                    </Td>
                    <ChevronTd>→</ChevronTd>
                  </Tr>
                ))}
              </tbody>
            </Table>

            <MobileList>
              {pageRows.map(({ app, opportunity }) => (
                <ListRow key={app.opportunityId} type="button" onClick={() => navigate(`/oportunidades/${opportunity.id}`)}>
                  <RowMain>
                    <RowTitle>{opportunity.title}</RowTitle>
                    <RowMeta style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CountryFlag code={isoCodeByName(opportunity.country)} label={opportunity.country} size={14} />
                      {opportunity.country} · {opportunity.counterpartSector}
                    </RowMeta>
                  </RowMain>
                  <Badge
                    label={statusLabel(app.status)}
                    statusMap={{ [statusLabel(app.status)]: APPLICATION_STATUS_STYLES[app.status] }}
                  />
                  <RowChevron>→</RowChevron>
                </ListRow>
              ))}
            </MobileList>

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              total={rows.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </ResultsCard>
        )}
      </Content>
    </Page>
  );
}
