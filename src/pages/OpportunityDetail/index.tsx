import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page, Content, PageHeader, TitleRow, PageTitle, PageSubtitle } from '../../components/PageShell';
import { BackButton, Button } from '../../components/Buttons';
import { Badge } from '../../components/Badge';
import { FeedbackModal } from '../../components/FeedbackModal';
import { useModal } from '../../hooks/useModal';
import { useTranslation } from '../../i18n';
import { formatDate } from '../../utils/date';
import { isoCodeByName } from '../../data/paho/countryFlags';
import { CountryFlag } from '../../components/CountryFlag';
import { MOCK_OPPORTUNITIES } from '../../data/paho/mockOpportunities';
import { APPLICATION_STATUS_STYLES } from '../../data/paho/mockApplications';
import { applicationsService } from '../../services/applicationsService';
import {
  DetailCard,
  BadgeRow,
  MetaGrid,
  MetaTerm,
  MetaValue,
  SectionLabel,
  BodyText,
  RequirementsList,
  RequirementItem,
} from './styles';

export function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const applyModal = useModal();
  const [application, setApplication] = useState(() => (id ? applicationsService.find(id) : undefined));
  const { t, language } = useTranslation();

  const opportunity = MOCK_OPPORTUNITIES.find((o) => o.id === id);

  if (!opportunity) {
    return (
      <Page>
        <Content>
          <PageHeader>
            <TitleRow>
              <BackButton onClick={() => navigate('/')} aria-label={t('opportunityDetail.back')}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </BackButton>
              <PageTitle>{t('opportunityDetail.notFoundTitle')}</PageTitle>
            </TitleRow>
          </PageHeader>
        </Content>
      </Page>
    );
  }

  const handleApply = () => {
    const result = applicationsService.apply(opportunity.id);
    setApplication(result);
    applyModal.open(
      <FeedbackModal
        type="success"
        title={t('opportunityDetail.applyModalTitle')}
        message={t('opportunityDetail.applyModalMessage', { title: opportunity.title })}
        onClose={applyModal.close}
      />,
    );
  };

  return (
    <Page>
      <Content>
        <PageHeader>
          <TitleRow>
            <BackButton onClick={() => navigate(-1)} aria-label={t('opportunityDetail.back')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </BackButton>
            <div>
              <PageTitle>{opportunity.title}</PageTitle>
              <PageSubtitle>{opportunity.reference}</PageSubtitle>
            </div>
          </TitleRow>
        </PageHeader>

        <DetailCard>
          <BadgeRow>
            {application && (
              <Badge
                label={t(`applicationStatus.${application.status}`)}
                statusMap={{ [t(`applicationStatus.${application.status}`)]: APPLICATION_STATUS_STYLES[application.status] }}
              />
            )}
            <Badge label={opportunity.technicalArea} />
            <Badge label={opportunity.band} />
          </BadgeRow>

          <MetaGrid>
            <MetaTerm>{t('opportunityDetail.country')}</MetaTerm>
            <MetaValue style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <CountryFlag code={isoCodeByName(opportunity.country)} label={opportunity.country} />
              {opportunity.country}
            </MetaValue>
            <MetaTerm>{t('opportunityDetail.sector')}</MetaTerm>
            <MetaValue>{opportunity.counterpartSector}</MetaValue>
            <MetaTerm>{t('opportunityDetail.period')}</MetaTerm>
            <MetaValue>{formatDate(opportunity.startDate, language)} – {formatDate(opportunity.endDate, language)}</MetaValue>
          </MetaGrid>

          <SectionLabel>{t('opportunityDetail.about')}</SectionLabel>
          <BodyText>{opportunity.description}</BodyText>

          <SectionLabel>{t('opportunityDetail.requirements')}</SectionLabel>
          <RequirementsList>
            {opportunity.requirements.map((r) => (
              <RequirementItem key={r}>{r}</RequirementItem>
            ))}
          </RequirementsList>

          {application ? (
            <>
              <SectionLabel>{t('opportunityDetail.applicationStatus')}</SectionLabel>
              <BodyText>
                {t('opportunityDetail.submittedOn', {
                  date: formatDate(application.appliedAt, language),
                })}
                {application.response ? ` ${application.response}` : ` ${t('opportunityDetail.underReview')}`}
              </BodyText>
            </>
          ) : (
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <Button type="button" $variant="primary" onClick={handleApply}>{t('opportunityDetail.apply')}</Button>
            </div>
          )}
        </DetailCard>
      </Content>

      {applyModal.portal}
    </Page>
  );
}
