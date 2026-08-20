import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useChoiceSets } from '../../../data/paho/useChoiceSets';
import { useTranslation } from '../../../i18n';
import { Input, Select } from '../../Inputs';
import { CountrySelect } from '../../CountrySelect';
import { ChipMultiSelect } from '../ChipMultiSelect/ChipMultiSelect';
import { Field } from '../shared/Field';
import { FieldGrid, CharCount } from '../shared/styles';
import { RecordCard, RecordHeader, RecordTitle, RemoveButton, AddButton, TextArea } from './styles';

const MIN_RECORDS = 2;
const MAX_RECORDS = 5;
const OUTCOME_MIN = 30;
const OUTCOME_MAX = 500;

const BLANK_ASSIGNMENT = {
  title: '',
  client: '',
  sector: undefined,
  country: undefined,
  yearFrom: undefined,
  yearTo: undefined,
  role: undefined,
  outcome: '',
  relatedSkills: [],
};

interface AssignmentRecordsFieldProps {
  name: string; // 'assignments'
}

export function AssignmentRecordsField({ name }: AssignmentRecordsFieldProps) {
  const { control, register, formState, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: name as 'assignments' });
  const { t } = useTranslation();
  const { SECTORS, ASSIGNMENT_ROLES, SKILL_GROUPS } = useChoiceSets();
  const profileSkills: { skill: number }[] = watch('skills') ?? [];
  const skillOptions = SKILL_GROUPS.flatMap((g) => g.items).filter((s) =>
    profileSkills.some((p) => p.skill === s.value),
  );

  const errors = (formState.errors as Record<string, unknown>)[name] as
    | Array<Record<string, { message?: string }>>
    | undefined;

  return (
    <div>
      {fields.map((field, index) => {
        const outcome: string = watch(`${name}.${index}.outcome` as const) ?? '';
        const rowErrors = errors?.[index] ?? {};
        return (
          <RecordCard key={field.id}>
            <RecordHeader>
              <RecordTitle>{t('sections.experience.assignmentRecord', { index: index + 1 })}</RecordTitle>
              {fields.length > MIN_RECORDS && (
                <RemoveButton type="button" onClick={() => remove(index)}>
                  {t('sections.experience.assignmentRemove')}
                </RemoveButton>
              )}
            </RecordHeader>

            <FieldGrid $cols={2}>
              <Field label={t('sections.experience.assignmentTitle')} required error={rowErrors.title?.message}>
                <Input
                  placeholder={t('sections.experience.assignmentTitlePlaceholder')}
                  {...register(`${name}.${index}.title` as const)}
                />
              </Field>
              <Field label={t('sections.experience.assignmentClient')} required error={rowErrors.client?.message}>
                <Input {...register(`${name}.${index}.client` as const)} />
              </Field>
            </FieldGrid>

            <FieldGrid $cols={3} style={{ marginTop: 12 }}>
              <Field label={t('sections.experience.assignmentSector')} required error={rowErrors.sector?.message}>
                <Select {...register(`${name}.${index}.sector` as const, { valueAsNumber: true })} defaultValue="">
                  <option value="" disabled>{t('common.select')}</option>
                  {SECTORS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </Select>
              </Field>
              <Field label={t('sections.experience.assignmentCountry')} required error={rowErrors.country?.message}>
                <CountrySelect name={`${name}.${index}.country`} />
              </Field>
              <Field label={t('sections.experience.assignmentRole')} required error={rowErrors.role?.message}>
                <Select {...register(`${name}.${index}.role` as const, { valueAsNumber: true })} defaultValue="">
                  <option value="" disabled>{t('common.select')}</option>
                  {ASSIGNMENT_ROLES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </Select>
              </Field>
            </FieldGrid>

            <FieldGrid $cols={2} style={{ marginTop: 12 }}>
              <Field label={t('sections.experience.assignmentYearFrom')} required error={rowErrors.yearFrom?.message}>
                <Input type="number" placeholder="2022" {...register(`${name}.${index}.yearFrom` as const, { valueAsNumber: true })} />
              </Field>
              <Field label={t('sections.experience.assignmentYearTo')} hint={t('sections.experience.assignmentYearToHint')} error={rowErrors.yearTo?.message}>
                <Input type="number" placeholder="2024" {...register(`${name}.${index}.yearTo` as const, { valueAsNumber: true })} />
              </Field>
            </FieldGrid>

            <div style={{ marginTop: 12 }}>
              <Field
                label={t('sections.experience.assignmentOutcome')}
                required
                error={rowErrors.outcome?.message}
                hint={t('sections.experience.assignmentOutcomeHint')}
              >
                <TextArea {...register(`${name}.${index}.outcome` as const)} />
              </Field>
              <CharCount $short={outcome.length > 0 && outcome.length < OUTCOME_MIN}>
                {outcome.length}/{OUTCOME_MAX}
              </CharCount>
            </div>

            {skillOptions.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <Field label={t('sections.experience.assignmentRelatedSkills')} hint={t('sections.experience.assignmentRelatedSkillsHint')}>
                  <ChipMultiSelect name={`${name}.${index}.relatedSkills`} options={skillOptions} />
                </Field>
              </div>
            )}
          </RecordCard>
        );
      })}

      <AddButton
        type="button"
        disabled={fields.length >= MAX_RECORDS}
        onClick={() => append(BLANK_ASSIGNMENT as never)}
      >
        {fields.length >= MAX_RECORDS ? t('sections.experience.assignmentMax') : t('sections.experience.assignmentAdd')}
      </AddButton>
    </div>
  );
}
