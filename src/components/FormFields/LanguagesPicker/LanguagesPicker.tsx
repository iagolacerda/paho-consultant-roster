import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { labelFor } from '../../../data/paho/choiceSets';
import { useChoiceSets } from '../../../data/paho/useChoiceSets';
import { useTranslation } from '../../../i18n';
import { Select } from '../../Inputs';
import { Button } from '../../Buttons';
import { SelectedTable, RemoveButton } from '../SkillsPicker/styles';

const DEFAULT_PROFICIENCY = 20; // "Intermediário de trabalho"

interface LanguagesPickerProps {
  name: string; // 'languages'
}

// Lista incremental: escolhe um idioma no select, confirma no botão
// "Adicionar" e ele entra na tabela abaixo já com uma proficiência padrão,
// que pode ser ajustada por linha.
export function LanguagesPicker({ name }: LanguagesPickerProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: name as 'languages' });
  const [pending, setPending] = useState<string | number | undefined>(undefined);
  const { t } = useTranslation();
  const { LANGUAGES, PROFICIENCIES } = useChoiceSets();

  const selectedValues = (fields as unknown as { language: number }[]).map((f) => f.language);
  const available = LANGUAGES.filter((l) => !selectedValues.includes(l.value));

  const handleAdd = () => {
    if (pending === undefined) return;
    append({ language: pending, proficiency: DEFAULT_PROFICIENCY } as never);
    setPending(undefined);
  };

  return (
    <div>
      {fields.length > 0 && (
        <SelectedTable>
          <tbody>
            {fields.map((field, index) => {
              const languageValue = (field as unknown as { language: number }).language;
              return (
                <tr key={field.id}>
                  <td>{labelFor(LANGUAGES, languageValue)}</td>
                  <td style={{ width: 190 }}>
                    <Select name={`${name}.${index}.proficiency`} options={PROFICIENCIES} />
                  </td>
                  <td style={{ width: 36 }}>
                    <RemoveButton type="button" onClick={() => remove(index)} aria-label={t('common.remove')}>×</RemoveButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </SelectedTable>
      )}

      {available.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginTop: fields.length > 0 ? 12 : 0 }}>
          <div style={{ flex: 1 }}>
            <Select value={pending} onChange={setPending} options={available} placeholder={t('formFields.languagesPicker.addPlaceholder')} />
          </div>
          <Button type="button" $variant="primary" onClick={handleAdd} disabled={pending === undefined}>
            {t('common.add')}
          </Button>
        </div>
      )}
    </div>
  );
}
