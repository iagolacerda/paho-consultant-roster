import React, { useRef, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Buttons';
import { Select } from '../../components/Inputs';
import { Field } from '../../components/FormFields';
import { CountryFlag } from '../../components/CountryFlag';
import { isoCodeByName } from '../../data/paho/countryFlags';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTranslation } from '../../i18n';
import { FilterActions } from './styles';
import {
  Wrap as CountryWrap,
  Trigger as CountryTrigger,
  TriggerLabel as CountryTriggerLabel,
  Dropdown as CountryDropdown,
  OptionRow as CountryOptionRow,
} from '../../components/CountrySelect/styles';

export interface OpportunityFilters {
  technicalArea: string;
  country: string;
  band: string;
}

export const EMPTY_OPPORTUNITY_FILTERS: OpportunityFilters = { technicalArea: '', country: '', band: '' };

interface FilterDrawerProps {
  initialFilters: OpportunityFilters;
  technicalAreas: string[];
  countries: string[];
  bands: string[];
  onApply: (filters: OpportunityFilters) => void;
  onClose: () => void;
}

export function FilterDrawer({ initialFilters, technicalAreas, countries, bands, onApply, onClose }: FilterDrawerProps) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(initialFilters);
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  useClickOutside(countryRef, () => setCountryOpen(false), countryOpen);

  return (
    <Modal title={t('opportunities.filtersTitle')} onClose={onClose} position="right">
      <Field label={t('opportunities.filterTechnicalArea')}>
        <Select
          value={draft.technicalArea || undefined}
          onChange={(v) => setDraft({ ...draft, technicalArea: (v as string) ?? '' })}
          options={technicalAreas.map((a) => ({ value: a, label: a }))}
          placeholder={t('common.all')}
          emptySelectable
          emptyLabel={t('common.all')}
        />
      </Field>

      <div style={{ marginTop: 16 }}>
        <Field label={t('opportunities.filterCountry')}>
          <CountryWrap ref={countryRef}>
            <CountryTrigger type="button" onClick={() => setCountryOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={countryOpen}>
              {draft.country && <CountryFlag code={isoCodeByName(draft.country)} label={draft.country} />}
              <CountryTriggerLabel $placeholder={!draft.country}>{draft.country || t('common.all')}</CountryTriggerLabel>
            </CountryTrigger>
            {countryOpen && (
              <CountryDropdown role="listbox">
                <CountryOptionRow type="button" onClick={() => { setDraft({ ...draft, country: '' }); setCountryOpen(false); }}>
                  {t('common.all')}
                </CountryOptionRow>
                {countries.map((c) => (
                  <CountryOptionRow key={c} type="button" onClick={() => { setDraft({ ...draft, country: c }); setCountryOpen(false); }}>
                    <CountryFlag code={isoCodeByName(c)} label={c} />
                    {c}
                  </CountryOptionRow>
                ))}
              </CountryDropdown>
            )}
          </CountryWrap>
        </Field>
      </div>

      <div style={{ marginTop: 16 }}>
        <Field label={t('opportunities.filterBand')}>
          <Select
            value={draft.band || undefined}
            onChange={(v) => setDraft({ ...draft, band: (v as string) ?? '' })}
            options={bands.map((b) => ({ value: b, label: b }))}
            placeholder={t('common.all')}
            emptySelectable
            emptyLabel={t('common.all')}
          />
        </Field>
      </div>

      <FilterActions>
        <Button type="button" $variant="ghost" onClick={() => setDraft(EMPTY_OPPORTUNITY_FILTERS)}>
          {t('opportunities.clearFilters')}
        </Button>
        <Button type="button" $variant="primary" onClick={() => onApply(draft)}>
          {t('opportunities.applyFilters')}
        </Button>
      </FilterActions>
    </Modal>
  );
}
