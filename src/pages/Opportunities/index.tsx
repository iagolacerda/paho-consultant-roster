import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Content, PageHeader, PageTitle, PageSubtitle } from '../../components/PageShell';
import { OpportunityCard } from '../../components/OpportunityCard';
import { useTranslation } from '../../i18n';
import { MOCK_OPPORTUNITIES } from '../../data/paho/mockOpportunities';
import { CardGrid } from './styles';

export function Opportunities() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Page>
      <Content>
        <PageHeader>
          <PageTitle>{t('opportunities.title')}</PageTitle>
          <PageSubtitle>{t('opportunities.subtitle')}</PageSubtitle>
        </PageHeader>

        <CardGrid>
          {MOCK_OPPORTUNITIES.map((op) => (
            <OpportunityCard key={op.id} opportunity={op} onClick={() => navigate(`/oportunidades/${op.id}`)} />
          ))}
        </CardGrid>
      </Content>
    </Page>
  );
}
