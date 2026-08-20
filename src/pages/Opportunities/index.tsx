import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Content, PageHeading } from '../../components/PageShell';
import { OpportunityCard } from '../../components/OpportunityCard';
import { Button } from '../../components/Buttons';
import { Pagination } from '../../components/Pagination';
import { EmptyState } from '../../components/DataTable';
import { FilterIcon, JobsIcon } from '../../components/icons';
import { useModal } from '../../hooks/useModal';
import { useTranslation } from '../../i18n';
import { MOCK_OPPORTUNITIES } from '../../data/paho/mockOpportunities';
import { applicationsService } from '../../services/applicationsService';
import { FilterDrawer, OpportunityFilters, EMPTY_OPPORTUNITY_FILTERS } from './FilterDrawer';
import { FilterBar, CardGrid } from './styles';

const PAGE_SIZE = 6;

export function Opportunities() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const filterModal = useModal();
  const [filters, setFilters] = useState<OpportunityFilters>(EMPTY_OPPORTUNITY_FILTERS);
  const [page, setPage] = useState(1);

  const technicalAreas = useMemo(
    () => Array.from(new Set(MOCK_OPPORTUNITIES.map((o) => o.technicalArea))).sort(),
    [],
  );
  const countries = useMemo(
    () => Array.from(new Set(MOCK_OPPORTUNITIES.map((o) => o.country))).sort(),
    [],
  );
  const bands = useMemo(
    () => Array.from(new Set(MOCK_OPPORTUNITIES.map((o) => o.band))).sort(),
    [],
  );

  const filtered = useMemo(
    () => MOCK_OPPORTUNITIES.filter((o) =>
      (!filters.technicalArea || o.technicalArea === filters.technicalArea) &&
      (!filters.country || o.country === filters.country) &&
      (!filters.band || o.band === filters.band),
    ),
    [filters],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const applyFilters = (next: OpportunityFilters) => {
    setFilters(next);
    setPage(1);
    filterModal.close();
  };

  const openFilters = () => {
    filterModal.open(
      <FilterDrawer
        initialFilters={filters}
        technicalAreas={technicalAreas}
        countries={countries}
        bands={bands}
        onApply={applyFilters}
        onClose={filterModal.close}
      />,
    );
  };

  return (
    <Page>
      <Content>
        <PageHeading icon={<JobsIcon />} title={t('opportunities.title')} subtitle={t('opportunities.subtitle')} />

        <FilterBar>
          <Button type="button" $variant="ghost" onClick={openFilters}>
            <FilterIcon />
            {t('opportunities.filters')}{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </Button>
        </FilterBar>

        {pageItems.length === 0 ? (
          <EmptyState>{t('opportunities.emptyResults')}</EmptyState>
        ) : (
          <CardGrid>
            {pageItems.map((op) => (
              <OpportunityCard
                key={op.id}
                opportunity={op}
                status={applicationsService.find(op.id)?.status}
                onClick={() => navigate(`/oportunidades/${op.id}`)}
              />
            ))}
          </CardGrid>
        )}

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </Content>

      {filterModal.portal}
    </Page>
  );
}
