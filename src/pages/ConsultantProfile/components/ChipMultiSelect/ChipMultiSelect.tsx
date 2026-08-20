// React
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
// Components
import { ChoiceOption } from '../../../../data/paho/choiceSets';
import { useTranslation } from '../../../../i18n';
// Local
import { Wrap, BadgeRow, Badge, RemoveBadge, SearchInput, Dropdown, DropdownOption, EmptyOption, LimitHint } from './styles';

interface ChipMultiSelectProps {
  name: string;
  options: ChoiceOption[];
  max?: number;
  exclude?: number[];
  placeholder?: string;
  // Ícone opcional antes do rótulo (badge selecionado + opção da lista) —
  // usado para mostrar a bandeira quando as opções são países.
  renderIcon?: (value: number) => React.ReactNode;
}

// Combobox de busca com os itens selecionados exibidos como badges removíveis
// — evita listar centenas de opções de uma vez quando o vocabulário é grande
// (ex.: países).
export function ChipMultiSelect({ name, options, max, exclude = [], placeholder, renderIcon }: ChipMultiSelectProps) {
  const { control } = useFormContext();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const resolvedPlaceholder = placeholder ?? t('formFields.chipMultiSelect.searchPlaceholder');

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value: number[] = field.value ?? [];
        const atLimit = Boolean(max) && value.length >= (max as number);

        const labelFor = (v: number) => options.find((o) => o.value === v)?.label ?? String(v);

        const q = query.trim().toLowerCase();
        const available = options.filter(
          (o) => !exclude.includes(o.value) && !value.includes(o.value) && (!q || o.label.toLowerCase().includes(q)),
        );

        const add = (v: number) => {
          if (atLimit) return;
          field.onChange([...value, v]);
          setQuery('');
        };

        const remove = (v: number) => field.onChange(value.filter((x) => x !== v));

        return (
          <Wrap ref={wrapRef}>
            {value.length > 0 && (
              <BadgeRow>
                {value.map((v) => (
                  <Badge key={v}>
                    {renderIcon?.(v)}
                    {labelFor(v)}
                    <RemoveBadge type="button" onClick={() => remove(v)} aria-label={`${t('common.remove')} ${labelFor(v)}`}>×</RemoveBadge>
                  </Badge>
                ))}
              </BadgeRow>
            )}
            {!atLimit && (
              <div style={{ position: 'relative' }}>
                <SearchInput
                  type="text"
                  placeholder={resolvedPlaceholder}
                  value={query}
                  onFocus={() => setOpen(true)}
                  onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                />
                {open && (
                  <Dropdown>
                    {available.length === 0 && <EmptyOption>{t('formFields.chipMultiSelect.noResults')}</EmptyOption>}
                    {available.map((o) => (
                      <DropdownOption key={o.value} type="button" onClick={() => add(o.value)}>
                        {renderIcon?.(o.value)}
                        {o.label}
                      </DropdownOption>
                    ))}
                  </Dropdown>
                )}
              </div>
            )}
            {atLimit && <LimitHint>{t('formFields.chipMultiSelect.limitReached', { max: max as number })}</LimitHint>}
          </Wrap>
        );
      }}
    />
  );
}
