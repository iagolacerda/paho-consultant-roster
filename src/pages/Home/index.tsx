import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Content, PageHeading } from '../../components/PageShell';
import { SectionTitle, SectionDescription, CompletenessMeter } from '../../components/FormFields';
import { OpportunityCard } from '../../components/OpportunityCard';
import { Carousel } from '../../components/Carousel';
import { Button } from '../../components/Buttons';
import { Badge } from '../../components/Badge';
import { CountryFlag } from '../../components/CountryFlag';
import { ListRow, RowMain, RowTitle, RowMeta, RowChevron } from '../../components/ListRow';
import { HomeIcon } from '../../components/icons';
import { useTranslation } from '../../i18n';
import { CURRENT_USER } from '../../data/paho/mockSession';
import { MOCK_PROFILE_STATUS } from '../../data/paho/mockProfileStatus';
import { MOCK_OPPORTUNITIES } from '../../data/paho/mockOpportunities';
import { APPLICATION_STATUS_STYLES } from '../../data/paho/mockApplications';
import { applicationsService } from '../../services/applicationsService';
import { isoCodeByName } from '../../data/paho/countryFlags';
import { DashboardStack, CardFoot, ProfileCard, OpportunitiesCard, ViewAllRow, CarouselWrap, MobileOpportunityList } from './styles';

const RECENT_OPPORTUNITIES = MOCK_OPPORTUNITIES.slice(0, 8);

export function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Page>
      <Content>
        <PageHeading
          icon={<HomeIcon />}
          title={t('home.title', { name: CURRENT_USER.firstName })}
          subtitle={t('home.subtitle')}
        />

        <DashboardStack>
          <ProfileCard>
            <SectionTitle>{t('home.profileCardTitle')}</SectionTitle>
            <SectionDescription>{t('home.profileCardSubtitle')}</SectionDescription>
            <CompletenessMeter result={MOCK_PROFILE_STATUS} />
            <CardFoot>
              <Button type="button" $variant="primary" onClick={() => navigate('/perfil-profissional')}>
                {t('home.continueProfile')}
              </Button>
            </CardFoot>
          </ProfileCard>

          <OpportunitiesCard>
            <SectionTitle>{t('home.recentJobsTitle')}</SectionTitle>
            <SectionDescription>{t('home.recentJobsSubtitle')}</SectionDescription>

            <CarouselWrap>
              <Carousel
                ariaLabel={t('home.recentJobsTitle')}
                prevLabel={t('home.carouselPrev')}
                nextLabel={t('home.carouselNext')}
              >
                {RECENT_OPPORTUNITIES.map((op) => (
                  <OpportunityCard
                    key={op.id}
                    opportunity={op}
                    status={applicationsService.find(op.id)?.status}
                    onClick={() => navigate(`/oportunidades/${op.id}`)}
                  />
                ))}
              </Carousel>
            </CarouselWrap>

            <MobileOpportunityList>
              {RECENT_OPPORTUNITIES.map((op) => {
                const status = applicationsService.find(op.id)?.status;
                const statusLabel = status ? t(`applicationStatus.${status}`) : undefined;
                return (
                  <ListRow key={op.id} type="button" onClick={() => navigate(`/oportunidades/${op.id}`)}>
                    <RowMain>
                      <RowTitle>{op.title}</RowTitle>
                      <RowMeta style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CountryFlag code={isoCodeByName(op.country)} label={op.country} size={14} />
                        {op.country} · {op.technicalArea}
                      </RowMeta>
                    </RowMain>
                    {statusLabel && (
                      <Badge label={statusLabel} statusMap={{ [statusLabel]: APPLICATION_STATUS_STYLES[status!] }} />
                    )}
                    <RowChevron>→</RowChevron>
                  </ListRow>
                );
              })}
            </MobileOpportunityList>

            <ViewAllRow>
              <Button type="button" $variant="ghost" onClick={() => navigate('/vagas')}>
                {t('home.viewAllJobs')}
              </Button>
            </ViewAllRow>
          </OpportunitiesCard>
        </DashboardStack>
      </Content>
    </Page>
  );
}
