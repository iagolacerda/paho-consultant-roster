import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Content, PageHeader, PageTitle, PageSubtitle } from '../../components/PageShell';
import { ResultsCard, Table, Th, Td, Tr, ChevronTd, EmptyState, MobileList } from '../../components/DataTable';
import { Badge } from '../../components/Badge';
import { MOCK_OPPORTUNITIES, Opportunity } from '../../data/paho/mockOpportunities';
import { Application, APPLICATION_STATUS_STYLES } from '../../data/paho/mockApplications';
import { applicationsService } from '../../services/applicationsService';
import { ListRow, RowMain, RowTitle, RowMeta, RowChevron } from '../../components/ListRow';
import { useTranslation } from '../../i18n';

interface ApplicationRow {
  app: Application;
  opportunity: Opportunity;
}

export function Applications() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const statusLabel = (status: Application['status']) => t(`applicationStatus.${status}`);
  const rows: ApplicationRow[] = [];
  applicationsService.list().forEach((app) => {
    const opportunity = MOCK_OPPORTUNITIES.find((o) => o.id === app.opportunityId);
    if (opportunity) rows.push({ app, opportunity });
  });

  return (
    <Page>
      <Content>
        <PageHeader>
          <PageTitle>{t('applications.title')}</PageTitle>
          <PageSubtitle>{t('applications.subtitle')}</PageSubtitle>
        </PageHeader>

        {rows.length === 0 ? (
          <ResultsCard><EmptyState>{t('applications.empty')}</EmptyState></ResultsCard>
        ) : (
          <ResultsCard>
            <Table>
              <thead>
                <tr>
                  <Th>{t('applications.columnJob')}</Th>
                  <Th>{t('applications.columnCountry')}</Th>
                  <Th>{t('applications.columnStatus')}</Th>
                  <Th aria-hidden />
                </tr>
              </thead>
              <tbody>
                {rows.map(({ app, opportunity }) => (
                  <Tr key={app.opportunityId} $clickable onClick={() => navigate(`/oportunidades/${opportunity.id}`)}>
                    <Td>
                      <strong>{opportunity.title}</strong>
                      <div style={{ fontSize: 12, color: '#7a7a7a', marginTop: 2 }}>{opportunity.reference}</div>
                    </Td>
                    <Td>{opportunity.country}</Td>
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
              {rows.map(({ app, opportunity }) => (
                <ListRow key={app.opportunityId} type="button" onClick={() => navigate(`/oportunidades/${opportunity.id}`)}>
                  <RowMain>
                    <RowTitle>{opportunity.title}</RowTitle>
                    <RowMeta>{opportunity.country} · {opportunity.startDate.slice(0, 4)}</RowMeta>
                  </RowMain>
                  <Badge
                    label={statusLabel(app.status)}
                    statusMap={{ [statusLabel(app.status)]: APPLICATION_STATUS_STYLES[app.status] }}
                  />
                  <RowChevron>→</RowChevron>
                </ListRow>
              ))}
            </MobileList>
          </ResultsCard>
        )}
      </Content>
    </Page>
  );
}
