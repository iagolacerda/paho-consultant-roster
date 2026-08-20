import React, { useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { labelFor } from '../../../data/paho/choiceSets';
import { useChoiceSets } from '../../../data/paho/useChoiceSets';
import { useTranslation } from '../../../i18n';
import { Select } from '../../Inputs';
import {
  Picker,
  SearchBar,
  PickerList,
  GroupLabel,
  PickerItem,
  Check,
  EmptyResult,
  SelectedTable,
  RemoveButton,
} from './styles';

const DEFAULT_DEPTH = 20; // "Proficiente"

interface SkillsPickerProps {
  name: string; // 'skills'
}

export function SkillsPicker({ name }: SkillsPickerProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: name as 'skills' });
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  const { SKILL_GROUPS, SKILL_DEPTHS } = useChoiceSets();

  const selectedValues = new Set((fields as unknown as { skill: number }[]).map((f) => f.skill));

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILL_GROUPS.map((g) => ({
      group: g.group,
      items: g.items.filter((i) => !q || i.label.toLowerCase().includes(q)),
    })).filter((g) => g.items.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, SKILL_GROUPS]);

  const toggle = (skillValue: number) => {
    const idx = (fields as unknown as { skill: number }[]).findIndex((f) => f.skill === skillValue);
    if (idx >= 0) {
      remove(idx);
      return;
    }
    if (fields.length >= 15) return;
    append({ skill: skillValue, depth: DEFAULT_DEPTH } as never);
  };

  return (
    <div>
      <Picker>
        <SearchBar>
          <input
            type="text"
            placeholder={t('formFields.skillsPicker.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </SearchBar>
        <PickerList>
          {groups.length === 0 && <EmptyResult>{t('formFields.skillsPicker.noResults')}</EmptyResult>}
          {groups.map((g) => (
            <div key={g.group}>
              <GroupLabel>{g.group}</GroupLabel>
              {g.items.map((item) => {
                const active = selectedValues.has(item.value);
                return (
                  <PickerItem key={item.value} type="button" $active={active} onClick={() => toggle(item.value)}>
                    <Check $active={active}>{active ? '✓' : ''}</Check>
                    {item.label}
                  </PickerItem>
                );
              })}
            </div>
          ))}
        </PickerList>
      </Picker>

      {fields.length > 0 && (
        <SelectedTable>
          <tbody>
            {fields.map((field, index) => {
              const skillValue = (field as unknown as { skill: number }).skill;
              return (
                <tr key={field.id}>
                  <td>{labelFor(SKILL_GROUPS.flatMap((g) => g.items), skillValue)}</td>
                  <td style={{ width: 170 }}>
                    <Select name={`${name}.${index}.depth`} options={SKILL_DEPTHS} />
                  </td>
                  <td style={{ width: 36 }}>
                    <RemoveButton type="button" onClick={() => remove(index)} aria-label={t('common.remove')}>
                      ×
                    </RemoveButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </SelectedTable>
      )}
    </div>
  );
}
