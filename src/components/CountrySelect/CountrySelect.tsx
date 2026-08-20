// React
import React, { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
// Components
import { isoCodeByValue } from '../../data/paho/countryFlags';
import { useChoiceSets } from '../../data/paho/useChoiceSets';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTranslation } from '../../i18n';
import { CountryFlag } from '../CountryFlag';
// Local
import { Wrap, Trigger, TriggerLabel, Dropdown, SearchInput, OptionRow, EmptyOption } from './styles';

interface CountrySelectProps {
  name: string;
  // Rótulo da opção vazia. Por padrão é um placeholder ("Selecione…") que só
  // aparece enquanto nada foi escolhido — para selects opcionais (ex.: segunda
  // nacionalidade) passe algo selecionável como "Nenhuma" via `emptyLabel` +
  // `emptySelectable`.
  emptyLabel?: string;
  emptySelectable?: boolean;
}

// Select de país com bandeira de verdade (SVG) ao lado do nome — <option>
// nativo não permite imagem dentro da lista, então esse é um dropdown
// próprio (mesmo padrão de ChipMultiSelect: busca + clique fora fecha).
export function CountrySelect({ name, emptyLabel, emptySelectable }: CountrySelectProps) {
  const { control } = useFormContext();
  const { t } = useTranslation();
  const { COUNTRIES } = useChoiceSets();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapRef, () => setOpen(false), open);

  const placeholder = emptyLabel ?? t('common.select');
  const q = query.trim().toLowerCase();
  const filtered = q ? COUNTRIES.filter((c) => c.label.toLowerCase().includes(q)) : COUNTRIES;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = COUNTRIES.find((c) => c.value === field.value);

        const pick = (value: number | undefined) => {
          field.onChange(value);
          setOpen(false);
          setQuery('');
        };

        return (
          <Wrap ref={wrapRef}>
            <Trigger type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}>
              {selected && <CountryFlag code={isoCodeByValue(selected.value)} label={selected.label} />}
              <TriggerLabel $placeholder={!selected}>{selected ? selected.label : placeholder}</TriggerLabel>
            </Trigger>
            {open && (
              <Dropdown role="listbox">
                <SearchInput
                  type="text"
                  autoFocus
                  placeholder={t('formFields.chipMultiSelect.searchPlaceholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {emptySelectable && (
                  <OptionRow type="button" onClick={() => pick(undefined)}>{emptyLabel}</OptionRow>
                )}
                {filtered.length === 0 && <EmptyOption>{t('formFields.chipMultiSelect.noResults')}</EmptyOption>}
                {filtered.map((c) => (
                  <OptionRow key={c.value} type="button" onClick={() => pick(c.value)}>
                    <CountryFlag code={isoCodeByValue(c.value)} label={c.label} />
                    {c.label}
                  </OptionRow>
                ))}
              </Dropdown>
            )}
          </Wrap>
        );
      }}
    />
  );
}
