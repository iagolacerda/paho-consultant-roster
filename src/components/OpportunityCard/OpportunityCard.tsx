// React
import React from 'react';
// Components
import { isoCodeByName } from '../../data/paho/countryFlags';
import { ApplicationStatus, APPLICATION_STATUS_STYLES } from '../../data/paho/mockApplications';
import { Opportunity } from '../../data/paho/mockOpportunities';
import { useTranslation } from '../../i18n';
import { formatDate } from '../../utils/date';
import { Badge } from '../Badge';
import { CountryFlag } from '../CountryFlag';
// Local
import { Card, CardHeader, CardBody, CardBadges, CardTitle, CardSummary, CardMeta } from './styles';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick: () => void;
  status?: ApplicationStatus;
}

export function OpportunityCard({ opportunity, onClick, status }: OpportunityCardProps) {
  const { t, language } = useTranslation();
  const statusLabel = status ? t(`applicationStatus.${status}`) : undefined;
  return (
    <Card type="button" onClick={onClick}>
      <CardHeader>
        <CardTitle>{opportunity.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <CardSummary>{opportunity.summary}</CardSummary>
        <CardBadges>
          {statusLabel && <Badge label={statusLabel} statusMap={{ [statusLabel]: APPLICATION_STATUS_STYLES[status as ApplicationStatus] }} />}
          <Badge label={opportunity.technicalArea} />
          <Badge label={opportunity.band} />
        </CardBadges>
        <CardMeta>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <CountryFlag code={isoCodeByName(opportunity.country)} label={opportunity.country} />
            {opportunity.country}
          </span>
          <span>{formatDate(opportunity.startDate, language)} – {formatDate(opportunity.endDate, language)}</span>
        </CardMeta>
      </CardBody>
    </Card>
  );
}
