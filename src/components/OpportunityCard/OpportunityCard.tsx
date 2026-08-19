import React from 'react';
import { Opportunity } from '../../data/paho/mockOpportunities';
import { ApplicationStatus, APPLICATION_STATUS_STYLES } from '../../data/paho/mockApplications';
import { Badge } from '../Badge';
import { useTranslation } from '../../i18n';
import { Card, CardBadges, CardTitle, CardSummary, CardMeta } from './styles';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick: () => void;
  status?: ApplicationStatus;
}

export function OpportunityCard({ opportunity, onClick, status }: OpportunityCardProps) {
  const { t } = useTranslation();
  const statusLabel = status ? t(`applicationStatus.${status}`) : undefined;
  return (
    <Card type="button" onClick={onClick}>
      <CardBadges>
        {statusLabel && <Badge label={statusLabel} statusMap={{ [statusLabel]: APPLICATION_STATUS_STYLES[status as ApplicationStatus] }} />}
        <Badge label={opportunity.technicalArea} />
        <Badge label={opportunity.band} />
      </CardBadges>
      <CardTitle>{opportunity.title}</CardTitle>
      <CardSummary>{opportunity.summary}</CardSummary>
      <CardMeta>
        <span>{opportunity.country}</span>
        <span>{opportunity.startDate} – {opportunity.endDate}</span>
        <span>{opportunity.reference}</span>
      </CardMeta>
    </Card>
  );
}
