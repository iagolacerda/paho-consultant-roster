import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Content, PageHeader, PageTitle, PageSubtitle } from '../../components/PageShell';
import { SectionCard, SectionTitle, SectionDescription, CompletenessMeter } from '../../components/FormFields';
import { ListRow, RowMain, RowTitle, RowMeta, RowChevron } from '../../components/ListRow';
import { Button } from '../../components/Buttons';
import { useTranslation } from '../../i18n';
import { CURRENT_USER } from '../../data/paho/mockSession';
import { MOCK_PROFILE_STATUS } from '../../data/paho/mockProfileStatus';
import { MOCK_OPPORTUNITIES } from '../../data/paho/mockOpportunities';
import { DashboardGrid, CardFoot, ViewAllLink, FeaturedCard } from './styles';

const RECENT_OPPORTUNITIES = MOCK_OPPORTUNITIES.slice(0, 5);

export function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Page>
      <Content>
        <PageHeader>
          <PageTitle>{t('home.title', { name: CURRENT_USER.firstName })}</PageTitle>
          <PageSubtitle>{t('home.subtitle')}</PageSubtitle>
        </PageHeader>

        <DashboardGrid>
          <FeaturedCard style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '18px 18px 4px' }}>
              <SectionTitle>{t('home.recentJobsTitle')}</SectionTitle>
              <SectionDescription>{t('home.recentJobsSubtitle')}</SectionDescription>
            </div>
            {RECENT_OPPORTUNITIES.map((op) => (
              <ListRow key={op.id} type="button" onClick={() => navigate(`/oportunidades/${op.id}`)}>
                <RowMain>
                  <RowTitle>{op.title}</RowTitle>
                  <RowMeta>{op.country} · {op.technicalArea}</RowMeta>
                </RowMain>
                <RowChevron>→</RowChevron>
              </ListRow>
            ))}
            <ViewAllLink>
              <Button type="button" $variant="ghost" onClick={() => navigate('/vagas')}>
                {t('home.viewAllJobs')}
              </Button>
            </ViewAllLink>
          </FeaturedCard>

          <SectionCard>
            <SectionTitle>{t('home.profileCardTitle')}</SectionTitle>
            <SectionDescription>{t('home.profileCardSubtitle')}</SectionDescription>
            <CompletenessMeter result={MOCK_PROFILE_STATUS} />
            <CardFoot>
              <Button type="button" $variant="primary" onClick={() => navigate('/perfil-profissional')}>
                {t('home.continueProfile')}
              </Button>
            </CardFoot>
          </SectionCard>
        </DashboardGrid>
      </Content>
    </Page>
  );
}
